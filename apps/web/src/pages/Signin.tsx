import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { signin } from "../features/auth/auth.api";
import {
  signinSchema,
  type SigninFormValues,
} from "../features/auth/auth.schemas";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Field } from "../components/form/Field";
import { PasswordField } from "../components/form/PasswordField";

import { useAuthStore, selectSetToken } from "../stores/auth.store";

export default function Signin() {
  const navigate = useNavigate();
  const setToken = useAuthStore(selectSetToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SigninFormValues) {
    try {
      const res = await signin(values);
      setToken(res.accessToken);
      navigate("/app");
    } catch (err: any) {
      setError("root", { message: err?.message || "Signin failed" });
    }
  }

  return (
    <AuthLayout title="Welcome" subtitle="Sign in to continue.">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Email" error={errors.email?.message}>
          <input
            className="input"
            placeholder="example@company.com"
            {...register("email")}
          />
        </Field>

        <PasswordField
          label="Password"
          error={errors.password}
          register={register("password")}
        />

        {errors.root?.message ? (
          <p className="error">{errors.root.message}</p>
        ) : null}

        <button className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="helper text-center">
          New here?{" "}
          <Link
            className="font-semibold text-slate-900 hover:underline"
            to="/signup"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
