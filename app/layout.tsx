import type { Metadata } from "next"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/core/theme-provider"
import { AppSidebar } from "@/components/core/app-sidebar"
import { SiteHeader } from "@/components/core/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Energize",
  description: "Complete life tracker app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SiteHeader />
              <main className="flex flex-1 flex-col">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
