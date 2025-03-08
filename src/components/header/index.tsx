import ThemeToggle from '@/components/themeToggle'
import LocaleToggle from '../localeToggle'

const App = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl mb-4">React Theme Switcher</h1>
      <ThemeToggle />
      <LocaleToggle />
    </div>
  )
}

export default App
