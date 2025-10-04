import { Outfit } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://quore-it-ai-blogs.vercel.app'),
  title: {
    default: 'Blog App - Your Source for Quality Content',
    template: '%s | Blog App'
  },
  description: 'Discover insightful articles, tutorials, and stories on our blog. Stay updated with the latest trends and knowledge.',
  keywords: ['blog', 'articles', 'content', 'stories', 'tutorials', 'insights'],
  authors: [{ name: 'Blog App Team' }],
  creator: 'Blog App',
  publisher: 'Blog App',
  
  // Open Graph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://quore-it-ai-blogs.vercel.app',
    siteName: 'Blog App',
    title: 'Blog App - Your Source for Quality Content',
    description: 'Discover insightful articles, tutorials, and stories on our blog. Stay updated with the latest trends and knowledge.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog App - Your Source for Quality Content',
      },
      {
        url: '/images/logo2.png',
        width: 800,
        height: 600,
        alt: 'Blog App Logo',
      }
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Blog App - Your Source for Quality Content',
    description: 'Discover insightful articles, tutorials, and stories on our blog. Stay updated with the latest trends and knowledge.',
    images: ['/images/og-image.png'],
    creator: '@blogapp',
    site: '@blogapp',
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (add your verification codes if needed)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  
  // Alternate languages (if you have multiple language versions)
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://quore-it-ai-blogs.vercel.app',
  },
  
  // Category
  category: 'technology',
}

export default function RootLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://quore-it-ai-blogs.vercel.app';
  const ogImageUrl = `${baseUrl}/images/og-logo2.png`;

  return (
    <html lang="en">
      <head>
        {/* OG Image Meta Tag */}
        <meta name="image" property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Blog App - Your Source for Quality Content" />
        <meta property="og:image:type" content="image/png" />
        
        {/* Twitter Image */}
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content="Blog App - Your Source for Quality Content" />
        
        {/* Favicon - Simple approach with timestamp for cache busting */}
        <link rel="icon" href={`/images/logo2.png?t=${Date.now()}`} type="image/png" />
        <link rel="shortcut icon" href={`/images/logo2.png?t=${Date.now()}`} type="image/png" />
        <link rel="apple-touch-icon" href={`/images/logo2.png?t=${Date.now()}`} />
        
        {/* Standard favicon sizes */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        
        {/* Apple Touch Icons for iOS devices */}
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={outfit.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}