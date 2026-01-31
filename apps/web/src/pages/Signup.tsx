import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../features/auth/auth.api";
import {
  signupSchema,
  type SignupFormValues,
} from "../features/auth/auth.schemas";
import { AuthLayout } from "../components/layout/AuthLayout";
import { Field } from "../components/form/Field";
import { PasswordField } from "../components/form/PasswordField";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    try {
      const { email, name, password } = values;
      await signup({ email, name, password });
      navigate("/signin");
    } catch (err: any) {
      setError("root", { message: err?.message || "Signup failed" });
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Sign up to get started">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Email" error={errors.email?.message}>
          <input
            className="input"
            placeholder="example@company.com"
            {...register("email")}
          />
        </Field>

        <Field label="Name" error={errors.name?.message}>
          <input
            className="input"
            placeholder="Your name"
            {...register("name")}
          />
        </Field>

        <PasswordField
          label="Password"
          error={errors.password}
          register={register("password")}
        />

        <PasswordField
          label="Confirm password"
          error={errors.confirmPassword}
          register={register("confirmPassword")}
        />

        {errors.root?.message && <p className="error">{errors.root.message}</p>}

        <button className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </button>

        <p className="helper text-center">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-slate-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
