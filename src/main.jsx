import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import X_App from './test.jsx'
import AuditPage from './Audit/AuditPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuditPage />
    {/* <X_App/> */}
  </StrictMode>,
)
