'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, themes } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors" aria-label="Toggle theme" disabled>
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      )}
    </button>
  )
}
