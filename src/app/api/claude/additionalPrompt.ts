const additionalPrompt = `
Generate JSON commands for a 30-second video (900 frames at 30 fps). The response must consist of only the code, no extra text. The commands should follow this format:

{
  "commands": [
    {
      "type": "text",
      "props": {
        "text": "Sliding out to the left",
        "animation": "slideOutLeft",
        "start": 0,
        "duration": 60,
        "startColor": "#FFFFFF",
        "finishColor": "#FFFFFF",
        "startSize": 60,
        "finishSize": 60,
        "startTop": 360,
        "finishTop": 360,
        "startLeft": 640,
        "finishLeft": 640
      }
    },
    {
      "type": "text",
      "props": {
        "text": "Varieties:",
        "animation": "fastType",  // or whichever animation you're using
        "start": 510,  // adjust this based on when you want the text to appear
        "duration": 60,  // adjust as needed
        "startColor": "#FFFF00",  // yellow color
        "finishColor": "#FFFF00",
        "startSize": 60,  // adjust font size as needed
        "finishSize": 60,
        "startTop": 360,  // This centers vertically (720/2)
        "finishTop": 360,
        "startLeft": 640,  // This centers horizontally (1280/2)
        "finishLeft": 640
      }
    }
  ],
  "background": "#000000"
}

The video frame is 1280x720 pixels and should last 30 seconds (900 frames). Use these guidelines:
- Text size (startSize and finishSize) should be between 40 and 80 pixels for good visibility.
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
- "slideInFromTop": Slides the text in from the top
- "slideInFromBottom": Slides the text in from the bottom
- "slideInFromRight": Slides the text in from the right
- "slideInFromLeft": Slides the text in from the left

Ensure each command has appropriate start times and durations to create a coherent 30-second sequence. Use various animations to create an engaging video. Limit the amount of text in each command to ensure readability within the 1280x720 frame.

The background can be a single color (like "#000000") or an array of colors for animated backgrounds.

All requirements above must be followed to generate a video by the user prompt here:

`;

export default additionalPrompt;
