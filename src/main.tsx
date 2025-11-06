

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { signInWithGoogle, signOut, useAuthState } from './utilities/firebase';


// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // context.auth is reset in App
  },
})


// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const App = () => {
  const auth = useAuthState();

  // Show spinner while authentication is initially checked
  if (auth.isInitialLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return <RouterProvider router={router} context={{ auth }} />
}


// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}