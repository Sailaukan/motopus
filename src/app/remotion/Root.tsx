import React from "react";
import { Composition, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={30 * 5}
        fps={30}
        width={720}
        height={1280}
      />
    </>
  );
};

const MinecraftLogo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
    durationInFrames: 30,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '20%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '5rem',
          fontWeight: 'bold',
          color: '#44891A',
          textShadow: '2px 2px #3D3D3D',
          letterSpacing: '4px',
        }}
      >
        MINECRAFT
      </div>
    </div>
  );
};

const TutorialText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const y = interpolate(frame, [0, 15], [50, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        width: '100%',
        textAlign: 'center',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <h2
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '3rem',
          color: '#FFF',
          textShadow: '2px 2px #000',
        }}
      >
        Tutorial
      </h2>
    </div>
  );
};

const BlockAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blockTypes = ['dirt', 'stone', 'wood', 'grass'];
  const colors = ['#8B4513', '#808080', '#8B4513', '#228B22'];

  const blockSize = 80;
  const gap = 20;
  const totalWidth = blockTypes.length * (blockSize + gap) - gap;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: `${gap}px`,
      }}
    >
      {blockTypes.map((block, index) => {
        const delay = index * 5;
        const blockFrame = frame - delay;
        const y = spring({
          fps,
          frame: blockFrame,
          config: {
            damping: 12,
            stiffness: 200,
            mass: 1,
          },
          durationInFrames: 30,
        });

        return (
          <div
            key={block}
            style={{
              width: `${blockSize}px`,
              height: `${blockSize}px`,
              backgroundColor: colors[index],
              border: '4px solid #000',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              transform: `translateY(${interpolate(y, [0, 1], [200, 0])}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

const Background = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)',
      }}
    />
  );
};

const Main = () => {
  const { durationInFrames } = useVideoConfig();

  return (
    <div style={{ flexGrow: 1 }}>
      <Sequence from={0} durationInFrames={durationInFrames}>
        <Background />
      </Sequence>
      <Sequence from={30} durationInFrames={durationInFrames}>
        <MinecraftLogo />
      </Sequence>
      <Sequence from={60} durationInFrames={durationInFrames}>
        <TutorialText />
      </Sequence>
      <Sequence from={90} durationInFrames={durationInFrames}>
        <BlockAnimation />
      </Sequence>
    </div>
  );
};