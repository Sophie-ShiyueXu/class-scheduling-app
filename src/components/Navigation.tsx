import { Link, Outlet } from '@tanstack/react-router'
import Button from './Button'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase'

function Navigation() {
  const { user, isAuthenticated, isInitialLoading } = useAuthState();

  return (
    <>
      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold">
            Course Scheduler
          </Link>
          
          <div className="navbar-nav me-auto">
            <Link 
              to="/" 
              className="nav-link [&.active]:text-warning [&.active]:fw-bold"
            >
              All Courses
            </Link>
          </div>

          <div className="navbar-nav ms-auto d-flex flex-row align-items-center gap-3">
            <span className="navbar-text text-light small">
              {isInitialLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Checking authentication...
                </>
              ) : (
                <>
                  <span className="me-2"></span>
                  Welcome, {user ? user.displayName ?? 'User' : 'Guest'}!
                  {isAuthenticated && <span className="ms-2 badge bg-success">✓</span>}
                </>
              )}
            </span>
            
            {!isInitialLoading && (
              isAuthenticated ? (
                <Button onClick={() => signOut()}>
                  Sign Out
                </Button>
              ) : (
                <Button onClick={() => signInWithGoogle()}>
                  Sign In with Google
                </Button>
              )
            )}
          </div>
        </div>
      </nav>

\
      {/* Main Content Area */}
      <main className="container-fluid py-3">
        <Outlet />
      </main>

      {/* Development Tools */}
      <TanStackRouterDevtools />
    </>
  );
}

export default Navigation;