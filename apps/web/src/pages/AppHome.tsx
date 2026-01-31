import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getApp } from "../features/app/app.api";
import { useAuthStore, selectLogout } from "../stores/auth.store";
import { TopNav } from "../components/layout/TopNav";

export default function AppHome() {
  const navigate = useNavigate();
  const logout = useAuthStore(selectLogout);

  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    getApp()
      .then((res) => {
        setMessage(res.message);
      })
      .catch(() => {
        logout();
        navigate("/signin", { replace: true });
      });
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-slate-900">{message}</h1>
      </div>
    </div>
  );
}
