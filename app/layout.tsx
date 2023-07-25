

import '@/styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: 'TheschoolBook',
  description: 'Work in progress'
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        
      <ThemeProvider attribute="class">
        {children}
        <Toaster />
      </ThemeProvider>

      </body>
    </html>
  )
}