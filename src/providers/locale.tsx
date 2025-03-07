import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface LocaleProviderProps {
  children: ReactNode
}

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const {
    i18n: { dir }
  } = useTranslation()

  return <div dir={dir()}>{children}</div>
}
