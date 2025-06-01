// app/page.tsx
'use client'

import {  useState } from 'react'
import Songs from './components/Songs'

export default function Home() {


  return (
    <main className="p-8" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold mb-8">🎵 My Music Player</h1>

        {/* R2 Songs Section */}
        <Songs/>
      </div>
    </main>
  )
}