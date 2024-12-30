import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import enTranslation from './locales/en-US.json'
import zhTranslation from './locales/zh-CN.json';

i18next.init({
  interpolation: { escapeValue: false },  // React 已经处理了 XSS
  lng: 'en',  // 默认语言
  resources: {
    en: { translation: enTranslation },
    zh: { translation: zhTranslation },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  </StrictMode>,
)
