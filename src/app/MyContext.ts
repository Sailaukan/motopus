'use client'

import { createContext, useContext } from 'react';

interface IMyContext {
  text: string;
  setText: (value: string) => void;
}

export const MyContext = createContext<IMyContext>({
  text: '',
  setText: () => {},
});

export const useMyContext = () => useContext(MyContext);
