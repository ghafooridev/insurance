import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'
import { ThemeProvider } from '@/providers/theme'
import { LocaleProvider } from '@/providers/locale'
import './i18n'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Router />
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </LocaleProvider>
  </StrictMode>
)
