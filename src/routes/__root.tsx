import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="bg-dark text-white d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Outlet />
        <TanStackRouterDevtools />
      </header>
    </>
  ),
  notFoundComponent: () => (
    <div className="h-screen flex items-center justify-center text-6xl">
     I looked for that page, I really did! 😭
    </div>
  )
});