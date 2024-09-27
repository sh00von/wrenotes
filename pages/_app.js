import "@/styles/globals.css";
import { useRouter } from "next/router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && router.pathname !== '/login') {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  // While loading or if on the login page, show children (the login page itself)
  if (loading || router.pathname === '/login') {
    return children;
  }

  // Show content if authenticated
  return user ? children : null;
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </AuthProvider>
  );
}
