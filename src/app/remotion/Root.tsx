'use client';

import React, { useState, useEffect } from 'react';
import { Sequence, useCurrentFrame, interpolate, spring } from 'remotion';

interface CommandProps {
  type: string;
  props: {
    [key: string]: any;
  };
}

interface MainProps {
  code: string;
}

const interpolateColor = (frame: number, startFrame: number, endFrame: number, startColor: string | undefined, endColor: string | undefined) => {
  const defaultColor = '#000000';
  const parseColor = (color: string | undefined) => {
    if (!color || typeof color !== 'string' || !color.startsWith('#')) {
      return parseInt(defaultColor.slice(1), 16);
    }
    return parseInt(color.slice(1), 16);
  };

  const start = parseColor(startColor);
  const end = parseColor(endColor);

  const r = Math.round(interpolate(frame, [startFrame, endFrame], [(start >> 16) & 255, (end >> 16) & 255]));
  const g = Math.round(interpolate(frame, [startFrame, endFrame], [(start >> 8) & 255, (end >> 8) & 255]));
  const b = Math.round(interpolate(frame, [startFrame, endFrame], [start & 255, end & 255]));

  return `rgb(${r},${g},${b})`;
};

const renderComponent = (frame: number, type: string, props: { [key: string]: any }) => {
  const duration = Math.max(props.duration, 30); // Ensure minimum duration of 30 frames
  const fadeInDuration = Math.min(15, duration / 4);
  const fadeOutDuration = Math.min(15, duration / 4);

  const commonStyles: React.CSSProperties = {
    position: 'absolute',
    color: interpolateColor(frame, props.start, props.start + duration, props.startColor, props.finishColor),
    fontSize: `${interpolate(frame, [props.start, props.start + duration], [props.startSize, props.finishSize])}rem`,
    top: `${interpolate(frame, [props.start, props.start + duration], [props.startTop, props.finishTop])}%`,
    left: `${interpolate(frame, [props.start, props.start + duration], [props.startLeft, props.finishLeft])}%`,
    opacity: interpolate(
      frame,
      [props.start, props.start + fadeInDuration, props.start + duration - fadeOutDuration, props.start + duration],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ),
  };

  const getTextAnimation = (animationType: string) => {
    switch (animationType) {
      case 'bounce':
        return {
          transform: `translateY(${spring({
            frame: frame - props.start,
            fps: 30,
            from: 0,
            to: -20,
            durationInFrames: props.duration,
          })}px)`,
        };
      case 'rotate':
        return {
          transform: `rotate(${interpolate(
            frame,
            [props.start, props.start + props.duration],
            [0, 360]
          )}deg)`,
        };
      case 'scale':
        return {
          transform: `scale(${spring({
            frame: frame - props.start,
            fps: 30,
            from: 0.5,
            to: 1,
            durationInFrames: props.duration,
          })})`,
        };
      default:
        return {};
    }
  };

  switch (type) {
    case 'text':
      return (
        <div
          style={{
            ...commonStyles,
            fontFamily: 'SF Pro Display, Arial, sans-serif',
            fontWeight: 'bold',
            ...getTextAnimation(props.animation),
          }}
        >
          {props.text}
        </div>
      );
    case 'shape':
      return (
        <div
          style={{
            ...commonStyles,
            width: `${interpolate(frame, [props.start, props.start + props.duration], [props.startSize, props.finishSize])}rem`,
            height: `${interpolate(frame, [props.start, props.start + props.duration], [props.startSize, props.finishSize])}rem`,
            backgroundColor: interpolateColor(frame, props.start, props.start + props.duration, props.startColor, props.finishColor),
            borderRadius: props.shape === 'circle' ? '50%' : props.shape === 'triangle' ? '0' : '0%',
            clipPath: props.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
          }}
        />
      );
    default:
      console.warn(`Unknown component type: ${type}`);
      return null;
  }
};

export const Main: React.FC<MainProps> = ({ code }) => {
  const [videoJSON, setVideoJSON] = useState<{
    commands: CommandProps[];
    background: string;
  } | null>(null);

  const frame = useCurrentFrame();

  useEffect(() => {
    try {
      const parsedJSON = JSON.parse(code);
      setVideoJSON(parsedJSON);
    } catch (error) {
      console.error("Invalid JSON in code context:", error);
      setVideoJSON(null);
    }
  }, [code]);

  if (!videoJSON) {
    return <div>Loading or invalid JSON...</div>;
  }

  return (
    <div style={{ flexGrow: 1, background: videoJSON.background || '#000' }}>
      {videoJSON.commands.map((command, index) => (
        <Sequence key={index} from={command.props.start} durationInFrames={command.props.duration}>
          {renderComponent(frame, command.type, command.props)}
        </Sequence>
      ))}
    </div>
  );
};