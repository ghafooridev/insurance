import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

function LocaleToggle() {
  const {
    i18n: { changeLanguage, language, dir }
  } = useTranslation()

  const onChangeLocale = (value: string) => {
    changeLanguage(value)
  }

  return (
    <div dir={dir()}>
      <Select onValueChange={onChangeLocale} value={language}>
        <SelectTrigger className="w-[180px] dark:text-black text-white">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">🇺🇸 English</SelectItem>
          <SelectItem value="fa">🇮🇷 Persian</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default LocaleToggle
