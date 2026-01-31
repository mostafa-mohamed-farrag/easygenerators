import { Navigate } from "react-router-dom";
import { useAuthStore, selectSignedIn } from "../../stores/auth.store";

export function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const signedIn = useAuthStore(selectSignedIn);
  if (signedIn) return <Navigate to="/app" replace />;
  return <>{children}</>;
}