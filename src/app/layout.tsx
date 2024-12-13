import './globals.css'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#BAE6FC] dark:bg-[#2C1B69] transition-all duration-500">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'VibeVit - Your Wellness Journey',
  description: 'Discover personalized health insights, evidence-based wellness solutions, and expert guidance for your optimal health journey.',
  keywords: 'health, wellness, diet, fitness, mental health, nutrition, biohacking, personalized health',
  authors: [{ name: 'VibeVit Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#BAE6FC' },
    { media: '(prefers-color-scheme: dark)', color: '#2C1B69' }
  ]
}
