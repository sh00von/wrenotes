import "@/styles/globals.css";
import { useRouter } from "next/router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import NProgress from "nprogress"; // Import nprogress
import Router from "next/router"; // Import next/router for event handling
import Footer from "@/components/Footer"
// Import nprogress styles
import "nprogress/nprogress.css";

function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && router.pathname !== '/login') {
      router.push('/login'); // Redirect to login if not authenticated
    } else if (!loading && user && router.pathname === '/login') {
      router.push('/'); // Redirect to home if authenticated
    }
  }, [user, loading, router]);

  // While loading or if on the login page, show children (the login page itself)
  if (loading || router.pathname === '/login') {
    return children;
  }

  // Show content if authenticated
  return user ? children : null;
}

// Configure nprogress
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <Component {...pageProps} />
        <Footer /> {/* Include the FooterNote here */}
      </AuthGuard>
    </AuthProvider>
  );
}
