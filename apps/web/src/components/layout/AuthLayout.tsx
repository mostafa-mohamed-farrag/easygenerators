import { type ReactNode } from "react";
import { Container } from "./Container";
import { TopNav } from "./TopNav";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />

      <main className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <section className="max-w-xl">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {subtitle}
                </p>
              )}
            </section>

            <section className="card p-6 sm:p-8">{children}</section>
          </div>
        </Container>
      </main>
    </div>
  );
}
