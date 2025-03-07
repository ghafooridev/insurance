import { ThemeContext } from '@/providers/theme'
import { use } from 'react'

const ThemeToggle = () => {
  const { toggleTheme, theme } = use(ThemeContext)

  return (
    <button
      type="button"
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
      onClick={toggleTheme}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}

export default ThemeToggle
