import ThemeToggle from '@/components/themeToggle'
import LocaleToggle from '../localeToggle'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { Button } from '../ui/button'

const Header = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const onChangeUrl = () => {
    if (pathname === '/form') navigate('/')
    else navigate('/form')
  }

  const getButtonTitle = () => {
    if (pathname === '/form') return 'Back To List'
    return 'Add Application'
  }
  return (
    <div className="h-16 bg-primary dark:bg-white w-full flex justify-between items-center px-4">
      <div>
        <h1 className="text-xl font-semibold dark:text-black text-white">{t('brandTitle')}</h1>
      </div>
      <div className="flex gap-2">
        <Button onClick={onChangeUrl} variant="secondary">
          {getButtonTitle()}
        </Button>
        <ThemeToggle />
        <LocaleToggle />
      </div>
    </div>
  )
}

export default Header
