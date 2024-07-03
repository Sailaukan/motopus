const additionalPrompt = `
Generate JSON commands for a video. The response must consist of only the code, no extra text. The commands should follow this format:

{
  "commands": [
    {
      "type": "text",
      "props": {
        "text": "Your Text Here",
        "startColor": "#FFFFFF",
        "finishColor": "#FFA500",
        "startSize": 5,
        "finishSize": 6,
        "startTop": 20,
        "finishTop": 25,
        "startLeft": 10,
        "finishLeft": 15,
        "start": 30,
        "duration": 90
      }
    },
    {
      "type": "shape",
      "props": {
        "shape": "circle", // or "square"
        "startColor": "#FFFFFF",
        "finishColor": "#00FF00",
        "startSize": 4.5,
        "finishSize": 5,
        "startTop": 30,
        "finishTop": 35,
        "startLeft": 20,
        "finishLeft": 25,
        "start": 120,
        "duration": 90
      }
    }
  ]
}
`;

export default additionalPrompt;
