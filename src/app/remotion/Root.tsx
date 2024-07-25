'use client';

import React, { useState, useEffect } from 'react';
import { Sequence, useCurrentFrame, interpolate, Easing, Video, Audio, Img } from 'remotion';

interface CommandProps {
  type: string;
  props: {
    [key: string]: any;
  };
}

interface MainProps {
  code: string;
}

interface VideoJSON {
  commands: CommandProps[];
  background: string | string[];
  backgroundImages: string[];
}

const getBackgroundImage = (frame: number, images: string[] | undefined, commands: CommandProps[]) => {
  if (!images || images.length === 0) return null;

  const currentCommandIndex = commands.findIndex((cmd, index) => {
    const nextCmd = commands[index + 1];
    return frame >= cmd.props.start && (!nextCmd || frame < nextCmd.props.start);
  });

  const imageIndex = currentCommandIndex === -1 ? 0 : currentCommandIndex % images.length;
  return images[imageIndex];
};

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

  const easeOutExpo = Easing.bezier(0.16, 1, 0.3, 1);

  const duration = Math.max(props.duration, 120);
  const fadeInDuration = Math.min(30, duration / 5);
  const fadeOutDuration = Math.min(30, duration / 5);

  const commonStyles: React.CSSProperties = {
    position: 'absolute',
    color: interpolateColor(frame, props.start, props.start + duration, props.startColor, props.finishColor),
    fontSize: `${interpolate(frame, [props.start, props.start + duration], [
      Math.max(40, Math.min(props.startSize || 60, 80)),
      Math.max(40, Math.min(props.finishSize || 60, 80))
    ])}px`,
    top: `${interpolate(frame, [props.start, props.start + duration], [props.startTop, props.finishTop])}px`,
    left: `${interpolate(frame, [props.start, props.start + duration], [props.startLeft, props.finishLeft])}px`,
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: 'auto',
    maxWidth: '1200px',
    opacity: interpolate(
      frame,
      [props.start, props.start + fadeInDuration, props.start + duration - fadeOutDuration, props.start + duration],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ),
  };

  const getTextAnimation = (animationType: string) => {

    switch (animationType) {
      case 'fastType':
        const text = props.text;
        const elasticEasing = Easing.elastic(1.1);
        const typeProgress = interpolate(
          frame,
          [props.start, props.start + props.duration * 1.7],
          [0, 1],
          {
            extrapolateRight: 'clamp',
            easing: elasticEasing,
          }
        );
        const charsToShow = Math.floor(text.length * typeProgress);
        return {
          clipPath: `inset(0 ${100 - (charsToShow / text.length) * 100}% 0 0)`,
          transform: `translate(-50%, -50%) scale(${interpolate(typeProgress, [0, 1], [0.95, 1], {
            extrapolateRight: 'clamp',
          })})`,
        };

      case 'progressiveReveal':
        const words = props.text.split(' ');
        const revealProgress = interpolate(
          frame,
          [props.start, props.start + props.duration * 2],
          [0, 1],
          {
            extrapolateRight: 'clamp',
            easing: easeOutExpo,
          }
        );

        const wordsToShow = Math.ceil(words.length * revealProgress);

        return {
          content: words.slice(0, wordsToShow).join(' '),
          opacity: interpolate(
            frame,
            [props.start, props.start + 10],
            [0, 1],
            { extrapolateRight: 'clamp' }
          ),
          transform: `translateY(${interpolate(
            frame,
            [props.start, props.start + props.duration * 0.7],
            [10, 0],
            { extrapolateRight: 'clamp', easing: easeOutExpo }
          )}px)`,
        };
      default:
        return {};
    }
  };

  if (type === 'text') {
    const animationStyle = getTextAnimation(props.animation);

    if (props.animation === 'progressiveReveal') {
      return (
        <div
          style={{
            ...commonStyles,
            fontFamily: 'SF Pro Display, Arial, sans-serif',
            fontWeight: 'bold',
            color: 'white', // Set text color to white
            textShadow: '0px 4px 12px black', // Add black shadow to text
          }}
        >
          {animationStyle.content}
        </div>
      );
    } else {
      return (
        <div
          style={{
            ...commonStyles,
            fontFamily: 'SF Pro Display, Arial, sans-serif',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0px 4px 12px black',
            ...animationStyle,
          }}
        >
          {props.text}
        </div>
      );
    }
  }




  console.warn(`Unknown component type: ${type}`);
  return null;
};

const isVideo = (url: string) => {
  return url.match(/\.(mp4|webm|ogg)$/i) !== null;
};

export const Main: React.FC<MainProps> = ({ code }) => {
  const [videoJSON, setVideoJSON] = useState<VideoJSON | null>(null);
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

  const sortedCommands = [...videoJSON.commands].sort((a, b) => a.props.start - b.props.start);

  const getBackgroundColor = () => {
    if (typeof videoJSON.background === 'string') {
      return videoJSON.background;
    } else if (Array.isArray(videoJSON.background)) {
      const currentCommandIndex = sortedCommands.findIndex((cmd, index) => {
        const nextCmd = sortedCommands[index + 1];
        return frame >= cmd.props.start && (!nextCmd || frame < nextCmd.props.start);
      });

      const backgroundIndex = currentCommandIndex === -1 ? 0 : currentCommandIndex % videoJSON.background.length;
      return videoJSON.background[backgroundIndex];
    }
    return '#000';
  };
  const getCurrentBackgroundMedia = () => {
    if (!videoJSON.backgroundImages || videoJSON.backgroundImages.length === 0) return null;

    const currentCommandIndex = sortedCommands.findIndex((cmd, index) => {
      const nextCmd = sortedCommands[index + 1];
      return frame >= cmd.props.start && (!nextCmd || frame < nextCmd.props.start);
    });

    const mediaIndex = currentCommandIndex === -1 ? 0 : currentCommandIndex % videoJSON.backgroundImages.length;
    return videoJSON.backgroundImages[mediaIndex];
  };

  const currentBackgroundMedia = getCurrentBackgroundMedia();

  return (
    <div style={{
      flexGrow: 1,
      background: getBackgroundColor(),
      position: 'relative',
      width: '1280px',
      height: '720px',
      overflow: 'hidden',
    }}>

      {currentBackgroundMedia && (
        isVideo(currentBackgroundMedia) ? (
          <Video
            src={currentBackgroundMedia}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Img
            src={currentBackgroundMedia}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )
      )}

      {videoJSON.commands.map((command, index) => (
        <Sequence key={index} from={command.props.start} durationInFrames={command.props.duration}>
          {renderComponent(frame, command.type, command.props)}
        </Sequence>
      ))}
    </div>
  );
};