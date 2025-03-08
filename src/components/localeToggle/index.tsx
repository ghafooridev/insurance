import { useTranslation } from 'react-i18next'

function LocaleToggle() {
  const {
    i18n: { changeLanguage, language, dir }
  } = useTranslation()

  const onChangeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    changeLanguage(value)
  }

  return (
    <div dir={dir()}>
      <div className="header">
        <select onChange={onChangeLocale} value={language}>
          <option value="en">🇺🇸 English</option>
          <option value="fa">🇮🇷 Persian</option>
        </select>
      </div>
    </div>
  )
}

export default LocaleToggle
