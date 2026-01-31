import { Navigate, Route, Routes } from "react-router-dom";

import Signup from "../pages/Signup";
import Signin from "../pages/SignIn";
import AppHome from "../pages/AppHome";
import { RequireAuth } from "../components/routing/RequireAuth";
import { RedirectIfAuth } from "../components/routing/RedirectIfAuth";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />

      <Route
        path="/signup"
        element={
          <RedirectIfAuth>
            <Signup />
          </RedirectIfAuth>
        }
      />

      <Route
        path="/signin"
        element={
          <RedirectIfAuth>
            <Signin />
          </RedirectIfAuth>
        }
      />

      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppHome />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}