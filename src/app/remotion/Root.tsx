import React from "react";
import { useMyContext } from '../MyContext';
import {
  Composition,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  random,
} from "remotion";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={Main}
      durationInFrames={10 * 30}
      fps={30}
      width={1280}
      height={500}
    />
  );
};

const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#007AFF', '#5856D6', '#FF2D55'];

const AnimatedText = ({ text, start, duration, color, size = '4rem', top }: { text: string; start: number; duration: number; color: string; size?: string; top: string }) => {
  const frame = useCurrentFrame();

  const progress = Math.max(0, Math.min(1, (frame - start) / 15));
  const exitProgress = Math.max(0, Math.min(1, (frame - (start + duration - 15)) / 15));

  const x = interpolate(progress, [0, 1], [-100, 0], { extrapolateRight: 'clamp' });
  const exitX = interpolate(exitProgress, [0, 1], [0, 100], { extrapolateLeft: 'clamp' });

  const opacity = interpolate(
    frame,
    [start, start + 15, start + duration - 15, start + duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: '10%',
        right: '10%',
        fontFamily: 'SF Pro Display, Arial, sans-serif',
        fontSize: size,
        fontWeight: 'bold',
        color: color,
        opacity,
        transform: `translateX(${x + exitX}px)`,
        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
      }}
    >
      {text}
    </div>
  );
};

const MotopusLogo = ({ text }: { text: string }) => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
    fps: 30,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontFamily: 'SF Pro Display, Arial, sans-serif',
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#FFF',
          letterSpacing: '2px',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        {text}
      </div>
    </div>
  );
};

const DynamicBackground = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  return (
    <svg width={width} height={height} style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          {colors.map((color, index) => (
            <stop
              key={index}
              offset={`${(index / (colors.length - 1)) * 100}%`}
              stopColor={color}
              stopOpacity={1}
            >
              <animate
                attributeName="stop-color"
                values={`${color};${colors[(index + 1) % colors.length]};${color}`}
                dur={`${durationInFrames / 30}s`}
                repeatCount="indefinite"
              />
            </stop>
          ))}
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#grad)">
        <animate
          attributeName="opacity"
          values="0.7;0.9;0.7"
          dur="10s"
          repeatCount="indefinite"
        />
      </rect>
      {Array.from({ length: 50 }).map((_, i) => (
        <circle
          key={i}
          r={random(`circle-${i}`) * 20 + 5}
          cx={random(`cx-${i}`) * width}
          cy={random(`cy-${i}`) * height}
          fill="#FFF"
          opacity={0.1}
        >
          <animate
            attributeName="cy"
            from={-50}
            to={height + 50}
            dur={`${random(`duration-${i}`) * 10 + 5}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};

const UserPrompt = ({ text }: { text: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  const animationProgress = (frame % (4 * fps)) / (4 * fps);

  const xOffset = interpolate(animationProgress, [0, 0.25, 0.5, 0.75, 1], [0, 50, 0, -50, 0]);
  const yOffset = interpolate(animationProgress, [0, 0.25, 0.5, 0.75, 1], [0, -50, 0, 50, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        right: '5%',
        padding: '20px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        transform: `translate(${xOffset}px, ${yOffset}px)`,
        opacity,
        transition: 'transform 0.5s ease-in-out',
      }}
    >
      <div style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '10px' }}>Your Prompt:</div>
      <div
        style={{
          fontFamily: 'SF Pro Display, Arial, sans-serif',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#FFF',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        {text}
      </div>
    </div>
  );
};

const MemoizedDynamicBackground = React.memo(DynamicBackground);

export const Main = React.memo(() => {
  const { text, setText } = useMyContext();
  const { durationInFrames } = useVideoConfig();

  return (
    <div style={{ flexGrow: 1, background: '#000' }}>
      <Sequence from={0} durationInFrames={durationInFrames}>
        <MemoizedDynamicBackground />
      </Sequence>
      <Sequence from={0} durationInFrames={durationInFrames}>
        <MotopusLogo text="Motopus" />
      </Sequence>
      <Sequence from={0} durationInFrames={durationInFrames}>
        <UserPrompt text={text} />
      </Sequence>
      <AnimatedText text="AI Animation Generator" start={30} duration={90} color="#FFF" size="5rem" top="20%" />
      <AnimatedText text="Transform Your Ideas" start={120} duration={90} color="#FFF" size="4.5rem" top="30%" />
      <AnimatedText text="Fast • Intuitive • Powerful" start={210} duration={90} color="#FFF" size="4rem" top="20%" />
      <AnimatedText text="Unleash Your Creativity" start={300} duration={90} color="#FFF" size="4.5rem" top="30%" />
      <AnimatedText text="Let's bring it to life!" start={390} duration={210} color="#FFF" size="5rem" top="20%" />
    </div>
  );
});