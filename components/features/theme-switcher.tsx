'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import * as React from 'react'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <button
        className="border-border bg-secondary-background size-11 border-2 p-0 transition-all hover:bg-main hover:scale-105 active:scale-95 rounded-base shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Sun className="stroke-foreground hidden size-6 dark:inline" />
        <Moon className="stroke-foreground inline size-6 dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </button>
    </>
  )
}