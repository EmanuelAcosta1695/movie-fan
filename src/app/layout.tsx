import { NotificationProvider } from '@/context/NotificationContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Fan',
  description: 'Para fanaticos del cine.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <NotificationProvider>
          <div className='w-full'>
            {children}
          </div>
        </NotificationProvider>
      </body>
    </html>
  )
}
