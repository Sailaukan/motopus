import React from "react";
import { Composition, Sequence, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { useMyContext } from '../MyContext';

type CommandProps = {
  [key: string]: any;
};

const renderComponent = (type: string, props: CommandProps) => {
  const frame = useCurrentFrame();

  const commonStyles: React.CSSProperties = {
    position: 'absolute',
    color: props.color,
    fontSize: props.size,
    top: props.top,
    left: props.left,
    right: props.right,
    bottom: props.bottom,
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
            width: props.size,
            height: props.size,
            backgroundColor: props.color,
            borderRadius: props.shape === 'circle' ? '50%' : '0%'
          }}
        />
      );
    // Add more cases for other component types
    default:
      console.warn(`Unknown component type: ${type}`);
      return null;
  }
};

// JSON data (replace this with actual data from API)
const videoJSON = {
  "commands": [
    {
      "type": "text",
      "props": {
        "text": "AI Animation Generator",
        "color": "#FFF",
        "size": "5rem",
        "top": "20%",
        "start": 30,
        "duration": 90
      }
    },
    {
      "type": "text",
      "props": {
        "text": "Transform Your Ideas",
        "color": "#FFF",
        "size": "4.5rem",
        "top": "30%",
        "start": 120,
        "duration": 90
      }
    }
    // Add more commands as needed
  ]
};

const RemotionRoot: React.FC = () => {
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

export const Main: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const { text } = useMyContext();

  return (
    <div style={{ flexGrow: 1, background: '#000' }}>
      {videoJSON.commands.map((command, index) => (
        <Sequence key={index} from={command.props.start} durationInFrames={command.props.duration}>
          {renderComponent(command.type, command.props)}
        </Sequence>
      ))}
    </div>
  );
};

export default RemotionRoot;
