import { createRoot } from 'react-dom/client'

import './index.css'
import Routes from './Routes'
import { LoadingProvider, ThemeProvider, AuthProvider } from './providers'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<>
  <ThemeProvider>
      <LoadingProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </LoadingProvider>
  </ThemeProvider>
</>)
