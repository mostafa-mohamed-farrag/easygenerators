import { Navigate } from "react-router-dom";
import { useAuthStore, selectSignedIn } from "../../stores/auth.store";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const signedIn = useAuthStore(selectSignedIn);
  if (!signedIn) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}
