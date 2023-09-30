import { NotificationProvider } from '@/context/NotificationContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Fan',
  description: 'Para fanaticos del cine.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

// el main se coloca asi para dar estilos globales
// se aplica a todas las paginas y componentes hijos que se añaden
// todos habitan dentro de este main o RootLayout
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* agregamos el provider de las notifaciones */}
        <NotificationProvider>
          <main className='min-h-screen flex flex-col items-center justify-center'>
            {children}
          </main>
        </NotificationProvider>
      </body>
    </html>
  )
}

// min-h-screen -> alto minimo del 100% de la pantalla
// flex flex-col -> flex y flex direction colum
// items-center -> items alineados al centro
// justify-center -> alineados vertical y horizontalmente