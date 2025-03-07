import { createContext, useState, ReactNode, useMemo } from 'react'

interface IThemeProviderProps {
  children: ReactNode
}
type Theme = 'light' | 'dark'
export interface IContextValue {
  theme: Theme
  toggleTheme?: () => void
}

export const ThemeContext = createContext<IContextValue>({
  theme: 'light'
})

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }
  const value = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme]
  )
  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === 'light' ? 'bg-white text-black' : 'bg-dark text-white'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
