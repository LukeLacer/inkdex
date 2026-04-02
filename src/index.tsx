import { createRoot } from 'react-dom/client'

import './index.css'
import Routes from './Routes'
import { AuthProvider, LoadingProvider } from './providers'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<>
  <AuthProvider>
    <LoadingProvider>
      <Routes />
    </LoadingProvider>
  </AuthProvider>
</>)
