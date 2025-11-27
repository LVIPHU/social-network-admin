import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'
import reportWebVitals from './reportWebVitals'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
// Initialize Zod with default locale
import { initializeZod } from './packages/libs/zod'
// Initialize Lingui with default locale
import { initializeLingui } from './packages/libs/lingui'

// Locales will be initialized in initApp() before rendering

// Create a new router instanc
export const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Initialize and render the app
async function initApp() {
  // Wait for locale initialization before rendering
  await initializeLingui()
  await initializeZod()

  const rootElement = document.getElementById('app')
  if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    )
  }
}

void initApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
