'use client';
import BetaPreview from './BetaPreview/page';
import MainPage from './components/MainPage';
import RootLayout from './RootLayout';
import Head from "next/head";


export default function Home() {
  return (
    <RootLayout>
      <Head>
        <link rel="icon" href="/motoicon.ico" />
      </Head>
      <MainPage />
      {/* <BetaPreview/> */}
    </RootLayout>
  );
}
