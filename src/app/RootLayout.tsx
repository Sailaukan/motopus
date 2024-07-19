import "@/app/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className=
          "min-h-screen bg-background antialiased"
      >
        {children}
      </body>
    </html>
  )
}
