// import { createContext, useState, ReactNode, useMemo } from 'react'

// interface IThemeProviderProps {
//   children: ReactNode
// }
// type Theme = 'light' | 'dark'
// export interface IContextValue {
//   theme: Theme
//   toggleTheme?: () => void
// }

// export const ThemeContext = createContext<IContextValue>({
//   theme: 'light'
// })

// export const ThemeProvider = ({ children }: IThemeProviderProps) => {
//   const [theme, setTheme] = useState<Theme>('light')

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
//   }
//   const value = useMemo(
//     () => ({
//       theme,
//       toggleTheme
//     }),
//     [theme]
//   )
//   return (
//     <ThemeContext.Provider value={value}>
//       <div className={theme === 'light' ? 'bg-white text-black' : 'bg-dark text-white'}>
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   )
// }

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
