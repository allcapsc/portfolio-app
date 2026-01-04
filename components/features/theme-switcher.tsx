'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

import * as React from 'react'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="hover:opacity-70 transition-opacity"
        aria-label="Toggle theme"
      >
        <Sun className="stroke-foreground size-8" />
      </button>
    )
  }

  return (
    <button
      className="hover:opacity-70 transition-opacity"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="stroke-foreground size-8" />
      ) : (
        <Sun className="stroke-foreground size-8" />
      )}
    </button>
  )
}