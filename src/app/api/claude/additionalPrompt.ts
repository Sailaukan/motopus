const additionalPrompt = `
Generate JSON commands for a 30-second video (900 frames at 30 fps). The response must consist of only the code, no extra text. The commands should follow this format:

{
  "commands": [
    {
      "type": "text",
      "props": {
        "text": "Example text",
        "animation": "fastType",
        "start": 0,
        "duration": 30,
        "startColor": "#FFFFFF",
        "finishColor": "#FFFFFF",
        "startSize": 60,
        "finishSize": 70,
        "startTop": 360,
        "finishTop": 360,
        "startLeft": 640,
        "finishLeft": 640
      }
    }
  ],
  "background": ["#000000", "#111111", "#222222"]
}

The video frame is 1280x720 pixels and should last 30 seconds (900 frames). Use these guidelines:
- Text size (startSize and finishSize) must be between 40 and 80 pixels for good visibility.
- You can animate text size by setting different values for startSize and finishSize.
- The time gap between two components must not be longer than 10 frames. (first start + duration = second start)
- Position text using pixel values: 
  - For horizontal center, use 640 for startLeft and finishLeft.
  - For vertical center, use 360 for startTop and finishTop.
  - Adjust these values to position text in different areas of the frame.
- Each frame is 1/30th of a second. Plan your animations accordingly:
  - start: 0 is the beginning of the video
  - duration: 30 frames = 1 second, 300 frames = 10 seconds, etc.
  - Ensure all animations fit within the 900-frame (30-second) timeline

Available animations are:
- "fastType": Rapidly types out the text
- "progressiveReveal": Reveals words one by one

Duration of every animation must not be longer than 45 frames.

Ensure each command has appropriate start times and durations to create a coherent 30-second sequence. Use various animations to create an engaging video. Limit the amount of text in each command to ensure readability within the 1280x720 frame.

The background must be an array of colors for animated backgrounds. The background color will change at the start of each new command, cycling through the array if there are more commands than colors.

All requirements above must be strictly followed to generate a video by the user prompt here:
`;

export default additionalPrompt;