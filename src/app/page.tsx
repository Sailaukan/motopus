'use client'; // This should be the very first line

import { useState } from 'react';
import { MyContext } from './MyContext';
import MainPage from './components/MainPage';
import BetaPreview from './BetaPreview/page';

export default function Home() {
  const [text, setText] = useState('');
  const [code, setCode] = useState('');

  return (
    <MyContext.Provider value={{ text, setText, code, setCode }}>
      <MainPage />
      {/* <BetaPreview/> */}
    </MyContext.Provider>
  );
}
