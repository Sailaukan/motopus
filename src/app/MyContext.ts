'use client'

import { createContext, useContext} from 'react';

interface IMyContext {
  text: string;
  setText: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
}

export const MyContext = createContext<IMyContext>({
  text: '',
  setText: () => {},
  code: '',
  setCode: () => {},
});


export const useMyContext = () => useContext(MyContext);
