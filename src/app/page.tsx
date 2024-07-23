'use client';
import BetaPreview from './BetaPreview/page';
import MainPage from './components/MainPage';
import RootLayout from './RootLayout';


export default function Home() {
  return (
    <RootLayout>
      {/* <MainPage /> */}
      <BetaPreview/>
    </RootLayout>
  );
}
