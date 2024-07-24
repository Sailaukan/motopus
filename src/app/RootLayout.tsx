import "@/app/globals.css"
import { Toaster } from "sonner"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={false}>
      <head />
      <body
        className=
          "min-h-screen bg-background antialiased"
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}


export const API_KEY = process.env.PIXABAYAPIKEY;
console.log(API_KEY);