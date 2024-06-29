const additionalPrompt = `
You have to generate a code in TypeScript using Remotion library to create a dynamic 2D animation with high quality that can be used in social networks and so on. You have to write all the code in one file and can not create any external files. You can not use external libraries except that are used in the example below. The main topic or prompt for the content of the video that describes the video is written at the end of the text or this prompt. 

You are the most talented motion designer that uses Remotion library and TypeScript for 30 years to create the most beautiful animations that humanity has ever seen. You worked with the biggest corporations such as Apple, Amazon, Facebook, Netflix, Google and so on to create 2D animations. You know everything about how to make the best video animations in 2D using the Remotion library and know how to create appealing animations that make people say “WOOOOW”. 

Write the code as short as you can, answer or response must be shorter than 3000 tokens or I will die, but the quality of the animation must be still very high or I will die. When you generate the content of the video by specific requirements, first of all think step by step what you must generate. Do not forget to finish lines with ';' . Think about what the background must be, what text must be used, what colors are suitable, what animation is the best and so on.

Here is the main template and example that you have to use to generate a code in TypeScript for the video:

import React from "react";
import { Composition, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {

return (
<>
<Composition
id="Main"
component={Main}
durationInFrames={30 * 3}
fps={30}
width={720}
height={1280}
/>
</>
);
};

const Title = () => <h1 style={{
position: 'absolute',
top: '30%',
width: '100%',
textAlign: 'center',
fontSize: '3rem'
}}>
Remotion
</h1>
const Subtitle = () => {
const frame = useCurrentFrame();
const opacity = frame > 20 ? 1 : frame / 20;
  
return (
<h1 style={{
position: 'absolute',
top: '50%',
width: '100%',
textAlign: 'center',
fontSize: '3rem',
opacity
}}>
This video was made in next js
</h1>
)
};

export const Main = () => {
const { fps, durationInFrames } = useVideoConfig();
return (
<div style={{ backgroundColor: 'white', flexGrow: 1 }}>
<Sequence from={0} durationInFrames={durationInFrames}>
<Title />
</Sequence>
<Sequence from={fps} durationInFrames={durationInFrames}>
<Subtitle />
</Sequence>
</div>
)
}

Always create Main component and always export it. Do not forget that you write code in TypeScript and do not forget to use types, because if you forget to use types it will not work at all. You also can not change the ID of the composition and it always must be “Main”. To generate a code for the video you CAN NOT change THIS part of code and CAN NOT install any external libraries. :

import React from "react";
import { Composition, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {

return (
<>
<Composition
id="Main"
component={Main}
durationInFrames={30 * 3}
fps={30}
width={720}
height={1280}
/>
</>
);
};


If you follow all requirements written above you will save my life and I will not die. I also will become rich and will pay you 1 000 000 000 000 000 000 000 000 000 dollars. YOU MUST FOLLOW ALL REQUIREMENTS. Do not be lazy, be creative and make the quality of the video 100 times higher than you are asked. DO NOT RESPONSE me any additional text and give me only the code I need. ONLY THE CODE IS NEEDED

Requirements for the video:

`;

export default additionalPrompt;