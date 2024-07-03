'use client';

import React, { useState, useEffect } from 'react';
import { Sequence, useCurrentFrame, interpolate } from 'remotion';

interface CommandProps {
  type: string;
  props: {
    [key: string]: any;
  };
}

interface MainProps {
  code: string;
}

const interpolateColor = (frame: number, startFrame: number, endFrame: number, startColor: string, endColor: string) => {
  const start = parseInt(startColor.slice(1), 16);
  const end = parseInt(endColor.slice(1), 16);

  const r = Math.round(interpolate(frame, [startFrame, endFrame], [(start >> 16) & 255, (end >> 16) & 255]));
  const g = Math.round(interpolate(frame, [startFrame, endFrame], [(start >> 8) & 255, (end >> 8) & 255]));
  const b = Math.round(interpolate(frame, [startFrame, endFrame], [start & 255, end & 255]));

  return `rgb(${r},${g},${b})`;
};

const renderComponent = (frame: number, type: string, props: { [key: string]: any }) => {

  const commonStyles: React.CSSProperties = {
    position: 'absolute',
    color: interpolateColor(frame, props.start, props.start + props.duration, props.startColor, props.finishColor),
    fontSize: `${interpolate(frame, [props.start, props.start + props.duration], [props.startSize, props.finishSize])}rem`,
    top: `${interpolate(frame, [props.start, props.start + props.duration], [props.startTop, props.finishTop])}%`,
    left: `${interpolate(frame, [props.start, props.start + props.duration], [props.startLeft, props.finishLeft])}%`,
    opacity: interpolate(
      frame,
      [props.start, props.start + 15, props.start + props.duration - 15, props.start + props.duration],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ),
  };

  switch (type) {
    case 'text':
      return (
        <div style={{ ...commonStyles, fontFamily: 'SF Pro Display, Arial, sans-serif', fontWeight: 'bold' }}>
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
            borderRadius: props.shape === 'circle' ? '50%' : '0%'
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
  }>(JSON.parse(code));
  const [isError, setIsError] = useState(false);

  const frame = useCurrentFrame();

  useEffect(() => {
    try {
      setVideoJSON(JSON.parse(code));
      setIsError(false);
    } catch (error) {
      console.error("Invalid JSON in code context:", error);
      setIsError(true);
    }
  }, [code]);

  return isError ? <div>Invalid JSON in code context</div> : (
    <div style={{ flexGrow: 1, background: '#000' }}>
      {videoJSON.commands.map((command, index) => (
        <Sequence key={index} from={command.props.start} durationInFrames={command.props.duration}>
          {renderComponent(frame, command.type, command.props)}
        </Sequence>
      ))}
    </div>
  );
};
