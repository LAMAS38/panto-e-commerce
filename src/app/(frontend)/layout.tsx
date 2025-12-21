import { Inter } from 'next/font/google'
import './styles.css'
import { Navbar } from './components/Navbar'
import ClientLayout from './ClientLayout'
import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  ),
  title: 'Panto - Premium Furniture Store',
  description: 'Discover our collection of minimalist and modern furniture for your home.',
}


export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {/* Navbar UNIQUE pour tout le site */}
          <Navbar />
          
          {/* Contenu des pages */}
          {children}
        </ClientLayout>
        <Footer />
      </body>
    </html>
  )
}
