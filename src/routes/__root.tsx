import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="text-center">
      <header className="bg-dark text-white d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="container py-4">
          <nav className="mb-3">
            <Link to="/" className="btn btn-sm btn-outline-light">Home</Link>
          </nav>
          <Outlet />
        </div>
      </header>
    </div>
  ),
})
