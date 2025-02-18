import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Network',
  description: 'Modern social network platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </body>
    </html>
  )
}