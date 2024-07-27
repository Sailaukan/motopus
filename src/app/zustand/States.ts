import { create } from 'zustand';

interface CodeState {
  code: string;
  setCode: (newCode: string) => void;
  resetCode: () => void;
}

const useCodeStore = create<CodeState>((set) => ({
  code: JSON.stringify({
    "commands": [
      {
        "type": "text",
        "props": {
          "text": "Welcome to our show",
          "animation": "fastType",
          "start": 0,
          "duration": 60,
          "startColor": "#FFFFFF",
          "finishColor": "#FFDD00",
          "startSize": 60,
          "finishSize": 70,
          "startTop": 200,
          "finishTop": 200,
          "startLeft": 640,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Enjoy the experience",
          "animation": "progressiveReveal",
          "start": 60,
          "duration": 120,
          "startColor": "#FFFFFF",
          "finishColor": "#00FF00",
          "startSize": 50,
          "finishSize": 60,
          "startTop": 300,
          "finishTop": 300,
          "startLeft": 640,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Innovate with us",
          "animation": "slideInFromLeft",
          "start": 180,
          "duration": 60,
          "startColor": "#FFFFFF",
          "finishColor": "#FF00FF",
          "startSize": 70,
          "finishSize": 70,
          "startTop": 360,
          "finishTop": 360,
          "startLeft": 1280,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Creativity Unleashed",
          "animation": "fastType",
          "start": 240,
          "duration": 60,
          "startColor": "#FFFFFF",
          "finishColor": "#00FFFF",
          "startSize": 60,
          "finishSize": 80,
          "startTop": 400,
          "finishTop": 400,
          "startLeft": 640,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Transform Your Ideas",
          "animation": "progressiveReveal",
          "start": 300,
          "duration": 120,
          "startColor": "#FFFFFF",
          "finishColor": "#FFA500",
          "startSize": 50,
          "finishSize": 60,
          "startTop": 450,
          "finishTop": 450,
          "startLeft": 640,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Step into the Future",
          "animation": "slideInFromLeft",
          "start": 420,
          "duration": 60,
          "startColor": "#FFFFFF",
          "finishColor": "#FF0000",
          "startSize": 70,
          "finishSize": 70,
          "startTop": 500,
          "finishTop": 500,
          "startLeft": 1280,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Join Us Now",
          "animation": "fastType",
          "start": 480,
          "duration": 60,
          "startColor": "#FFFFFF",
          "finishColor": "#0000FF",
          "startSize": 60,
          "finishSize": 80,
          "startTop": 550,
          "finishTop": 550,
          "startLeft": 640,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Let's Make Magic",
          "animation": "progressiveReveal",
          "start": 540,
          "duration": 120,
          "startColor": "#FFFFFF",
          "finishColor": "#008000",
          "startSize": 50,
          "finishSize": 60,
          "startTop": 600,
          "finishTop": 600,
          "startLeft": 640,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Dream Big",
          "animation": "slideInFromLeft",
          "start": 660,
          "duration": 60,
          "startColor": "#FFFFFF",
          "finishColor": "#800080",
          "startSize": 70,
          "finishSize": 70,
          "startTop": 650,
          "finishTop": 650,
          "startLeft": 1280,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "Achieve More",
          "animation": "fastType",
          "start": 720,
          "duration": 60,
          "startColor": "#FFFFFF",
          "finishColor": "#FF1493",
          "startSize": 60,
          "finishSize": 80,
          "startTop": 700,
          "finishTop": 700,
          "startLeft": 640,
          "finishLeft": 640
        }
      }
    ],
    "background": ["#000000", "#111111", "#222222"],
    "backgroundImages": []
  }),
  setCode: (newCode: string) => set({ code: newCode }),
  resetCode: () => set({ code: '' }),
}));

export default useCodeStore;
