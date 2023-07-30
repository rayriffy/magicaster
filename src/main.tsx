import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// we work outside StrictMode for now, i dont want to debug double events call rn
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
