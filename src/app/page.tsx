'use client'; // This should be the very first line

import { useState } from 'react';
import { MyContext } from './MyContext';
import MainPage from './components/MainPage';

export default function Home() {
  const [text, setText] = useState('');

  return (
    <MyContext.Provider value={{ text, setText }}>
      <MainPage />
    </MyContext.Provider>
  );
}
