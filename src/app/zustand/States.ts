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
          "text": "Sliding out to the left",
          "animation": "slideInFromLeft",
          "start": 0,
          "duration": 60,
          "startColor": "#FFFFFF",
          "finishColor": "#FFFFFF",
          "startSize": 60,
          "finishSize": 60,
          "startTop": 360,
          "finishTop": 360,
          "startLeft": 1280,
          "finishLeft": 640
        }
      },
      {
        "type": "text",
        "props": {
          "text": "This sentence will appear word by word",
          "animation": "progressiveReveal",
          "start": 60,
          "duration": 120,
          "startColor": "#FFFFFF",
          "finishColor": "#FFFFFF",
          "startSize": 50,
          "finishSize": 50,
          "startTop": 360,
          "finishTop": 360,
          "startLeft": 640,
          "finishLeft": 640
        }
      }
    ],
    "background": "#000000"
  }),
  setCode: (newCode: string) => set({ code: newCode }),
  resetCode: () => set({ code: '' }),
}));

export default useCodeStore;
