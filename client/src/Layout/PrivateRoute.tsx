import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { loggedIn, loading } = useAuth();

  if (loading) return null;

  if (!loggedIn) return <Navigate to="/" replace />;

  return <>{children}</>;
}
