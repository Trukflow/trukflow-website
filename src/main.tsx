import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Earlier versions stored the Firebase ID token in localStorage; clear any leftover copy
try {
  localStorage.removeItem('authToken')
} catch {
  // Storage can be unavailable (e.g. blocked cookies); nothing to clear
}

createRoot(document.getElementById("root")!).render(<App />);
