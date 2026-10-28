import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Self-hosted fonts: no extra connections to Google's servers before text can render
import '@fontsource-variable/geist/wght.css'
import '@fontsource/geist-mono/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './index.css'

// Earlier versions stored the Firebase ID token in localStorage; clear any leftover copy
try {
  localStorage.removeItem('authToken')
} catch {
  // Storage can be unavailable (e.g. blocked cookies); nothing to clear
}

createRoot(document.getElementById("root")!).render(<App />);
