import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import Router from "next/router";

interface IAuth {
  redirectTo?: string | boolean;
  redirectIfFound?: boolean;
}
const url = "/api/auth";

export const login = (params: object) => axios.post(`${url}/login`, params);

export const forget = async (params: object) =>
  await axios.post(`${url}/forget`, params);
export const reset = (params: object) => axios.put(`${url}/forget`, params);

export const register = (params: object) =>
  axios.post(`${url}/register`, params);

export const logout = async (mutate: any) => {
  await axios.post(`${url}/logout`);
  mutate();
};

const fetcher = (url: string) =>
  axios.get(url).then(({ data }: any) => data?.data);

export default function useAuth({
  redirectTo = false,
  redirectIfFound = false,
}: IAuth = {}) {
  const { data: user, error, mutate } = useSWR(`${url}/me`, fetcher);
  useEffect(() => {
    if (error && redirectTo && !redirectIfFound) Router.push(redirectTo as any);
    if (user && redirectIfFound) Router.push(redirectTo as any);
  }, [user, error, redirectTo, redirectIfFound]);

  return {
    user,
    loading: !user && !error,
    logout: () => logout(mutate),
  };
}
