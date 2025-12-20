import React from 'react'
import './styles.css'

export const metadata = {
  title: 'Panto - Premium Furniture Store',
  description: 'Make Your Interior More Minimalistic & Modern',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-zinc-50">
        {children}
      </body>
    </html>
  )
}
