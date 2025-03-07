import { useTranslation } from 'react-i18next'
function App() {
  const { t } = useTranslation()

  return <div>{t('hello')}</div>
}

export default App
