import { createRoot } from 'react-dom/client'

import './index.css'
import Routes from './Routes'
import { DataProvider, LoadingProvider } from './providers'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<>
  <DataProvider>
    <LoadingProvider>
      <Routes />
    </LoadingProvider>
  </DataProvider>
</>)
