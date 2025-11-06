import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { addAuthStateListener, type AuthState } from '../utilities/firebase';
import Navigation from '../components/Navigation';
import { useEffect } from 'react';
import { createRootRouteWithContext, useRouter } from '@tanstack/react-router'

interface RouterContext {
  auth: AuthState
}

const Root = () => {
    const router = useRouter();
  
    useEffect(() => addAuthStateListener(() => router.invalidate()), [router]);

    return <Navigation />
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => (
    <div className="h-screen flex items-center justify-center text-6xl">I looked for that page, I really did! 😭</div>
  )
});