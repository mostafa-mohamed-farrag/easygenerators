import { api } from "../../lib/api";

export type AppResponse = {
  message: string;
};

export function getApp() {
  return api<AppResponse>("/app");
}
