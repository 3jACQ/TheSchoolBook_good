

import '@/styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { siteConfig } from "@/config/site"
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "School",
    "IPFS",
    "Open Source",
    "File Sharing",
    "Decentralized",
    "Library",
    "Students",
    "Knowledge",
    "Sharing",
    "Documents",
    "Books",
    "Notes",
    "Summarize",
    "Translate",
    "Mind Map",
    "AI",
  ],
  authors: [
    {
      name: "JacquesD",

    },
  ],
  creator: "JacquesD",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/lg.svg",
  },
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>

        <ThemeProvider attribute="class">
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>

      </body>
    </html>
  )
}
