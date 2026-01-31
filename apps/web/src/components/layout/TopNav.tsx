import { Link, useNavigate } from "react-router-dom";
import { Container } from "./Container";
import { useAuthStore,  selectSignedIn, selectLogout } from "../../stores/auth.store";

export function TopNav() {
  const signedIn = useAuthStore(selectSignedIn);
  const logout = useAuthStore(selectLogout);
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate("/signin");
  }

  return (
    <header className="border-b border-slate-100">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">EasyGenerators</div>

          <nav className="flex items-center gap-2">
            {signedIn ? (
              <button className="btn-ghost" onClick={onLogout}>Logout</button>
            ) : (
              <>
                <Link className="btn-ghost" to="/signup">Sign up</Link>
                <Link className="btn-primary" to="/signin">Sign in</Link>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}