import { api } from "../../lib/api";

export type SignupPayload = { email: string; name: string; password: string };
export type SignupResponse = { id: string; email: string; name: string };

export type SigninPayload = { email: string; password: string };
export type SigninResponse = { accessToken: string };

export function signup(payload: SignupPayload) {
  return api<SignupResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function signin(payload: SigninPayload) {
  return api<SigninResponse>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
