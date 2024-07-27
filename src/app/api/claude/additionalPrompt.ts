const additionalPrompt = `
Generate a detailed JSON structure for a 30-second video (900 frames at 30 fps). The response must consist of only the code, no extra text. The JSON should follow this format:

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
  "background": ["#000000", "#111111", "#222222"],
  "backgroundImages": []
}

Video specifications:
- Frame size: 1280x720 pixels
- Duration: 30 seconds (900 frames)
- Framerate: 30 fps

Strict requirements for text commands:
1. Include at least 10 text commands.
2. Text size (startSize and finishSize) must be between 40 and 80 pixels.
3. Animate text size by setting different values for startSize and finishSize.
4. The time gap between two components must not exceed 10 frames.
5. Each text command must have a duration of at least 60 frames (2 seconds).
6. Position text using pixel values:
   - Horizontal center: 640 for startLeft and finishLeft
   - Vertical center: 360 for startTop and finishTop
   - Adjust these values to position text in different areas of the frame
7. Frame timing:
   - start: 0 is the beginning of the video
   - duration: 30 frames = 1 second, 300 frames = 10 seconds
   - Ensure all animations fit within the 900-frame (30-second) timeline
8. Available animations:
   - "fastType": Rapidly types out the text
   - "progressiveReveal": Reveals words one by one
9. Maximum animation duration: 120 frames
10. Limit text length to ensure readability within the 1280x720 frame

Background requirements:
1. The "background" property must be an array of at least 3 color values in hexadecimal format.
2. Background color changes at the start of each new command, cycling through the array.
3. Include the "backgroundImages" array, but leave it empty.

Additional guidelines:
1. Ensure each command has appropriate start times and durations for a coherent 30-second sequence.
2. Use various animations to create an engaging video.
3. Distribute text commands evenly throughout the 30-second duration.
4. Vary text positions, sizes, and colors for visual interest.
5. Ensure color contrast between text and background for readability.
6. Use meaningful and engaging text content related to the video's theme.

All requirements above must be strictly followed to generate a video based on the user's prompt. The JSON structure should be valid and free of syntax errors.
`;

export default additionalPrompt;
