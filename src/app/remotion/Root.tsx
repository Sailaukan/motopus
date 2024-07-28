'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, interpolate, Easing, Video, Img } from 'remotion';

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
  duration: number;
}

const usePreloadVideos = (videos: string[], dependencies: any[]) => {
  const [loadedVideos, setLoadedVideos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setLoadedVideos([]);

    const preloadVideo = (src: string) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement('video');
        video.src = src;
        video.onloadeddata = () => {
          setLoadedVideos((prev) => [...prev, src]);
          resolve();
        };
      });
    };

    Promise.all(videos.map(preloadVideo)).then(() => {
      setIsLoading(false);
    });
  }, [...dependencies, videos]);

  return { isLoading, videosLoaded: loadedVideos.length === videos.length };
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

const renderComponent = (frame: number, type: string, props: { [key: string]: any }, startFrame: number) => {
  const easeOutExpo = Easing.bezier(0.16, 1, 0.3, 1);
  const duration = Math.max(props.duration, 120);
  const fadeInDuration = Math.min(30, duration / 5);
  const fadeOutDuration = Math.min(30, duration / 5);
  const relativeFrame = frame - startFrame;

  const commonStyles: React.CSSProperties = {
    position: 'absolute',
    color: interpolateColor(frame, startFrame, startFrame + duration, props.startColor, props.finishColor),
    fontSize: `${interpolate(frame, [startFrame, startFrame + duration], [
      Math.max(40, Math.min(props.startSize || 60, 80)),
      Math.max(40, Math.min(props.finishSize || 60, 80))
    ])}px`,
    top: `${interpolate(frame, [startFrame, startFrame + duration], [props.startTop, props.finishTop])}px`,
    left: `${interpolate(frame, [startFrame, startFrame + duration], [props.startLeft, props.finishLeft])}px`,
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: 'auto',
    maxWidth: '1200px',
    opacity: interpolate(
      relativeFrame,
      [0, fadeInDuration, duration - fadeOutDuration, duration],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ),
  };

  const getTextAnimation = (animationType: string) => {
    const progress = Math.max(0, Math.min(1, relativeFrame / duration));

    switch (animationType) {
      case 'fastType':
        const text = props.text;
        const elasticEasing = Easing.elastic(1);
        const typeProgress = interpolate(
          progress,
          [0, 0.8, 1],
          [0, 1, 1],
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
          progress,
          [0, 0.7, 1],
          [0, 1, 1],
          {
            extrapolateRight: 'clamp',
            easing: easeOutExpo,
          }
        );
        const wordsToShow = Math.ceil(words.length * revealProgress);
        return {
          content: words.slice(0, wordsToShow).join(' '),
          opacity: 1,
          transform: `translate(-50%, -50%) translateY(${interpolate(
            revealProgress,
            [0, 1],
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
            color: 'white',
            textShadow: '0px 4px 12px black',
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


const VideoRenderer: React.FC<{ code: string }> = ({ code }) => {
  const [videoJSON, setVideoJSON] = useState<VideoJSON | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  useEffect(() => {
    setIsLoading(true);
    try {
      const parsedJSON = JSON.parse(code);
      setVideoJSON(parsedJSON);
      setIsLoading(false);
    } catch (error) {
      console.error("Invalid JSON in code context:", error);
      setVideoJSON(null);
      setIsLoading(false);
    }
  }, [code]);

  if (isLoading || !videoJSON) {
    return <div>Loading...</div>;
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

    let cumulativeDuration = 0;
    for (let i = 0; i < sortedCommands.length; i++) {
      const cmd = sortedCommands[i];
      if (frame < cumulativeDuration + cmd.props.duration) {
        return videoJSON.backgroundImages[i % videoJSON.backgroundImages.length];
      }
      cumulativeDuration += cmd.props.duration;
    }

    return videoJSON.backgroundImages[0];
  };

  const currentBackgroundMedia = getCurrentBackgroundMedia();
  let cumulativeDuration = 0;
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
            key={currentBackgroundMedia}
            src={currentBackgroundMedia}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            startFrom={0}
            endAt={durationInFrames}
          />
        ) : (
          <Img
            key={currentBackgroundMedia}
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

      {videoJSON.commands.map((command, index) => {
        const startFrame = cumulativeDuration;
        cumulativeDuration += command.props.duration;
        return (
          <Sequence key={index} from={startFrame} durationInFrames={command.props.duration}>
            {renderComponent(frame, command.type, command.props, startFrame)}
          </Sequence>
        );
      })}
    </div>
  );
};

export const Main: React.FC<MainProps> = ({ code }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [code]);

  return <VideoRenderer key={key} code={code} />;
};