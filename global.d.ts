import mongoose from "mongoose";
import { NextApiRequest } from "next";

type CookieOptions = {
  maxAge: number;
  expires?: Date;
  path?: string;
  domain?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
  encode?: (val: string) => string;
};
declare module "next" {
  export interface NextApiRequest {
    user: any;
    params: any;
  }
  interface NextApiResponse {
    user: any;
    status: (code: number) => NextApiResponse;
    send: (body: any) => NextApiResponse;
    json: (body: any) => NextApiResponse;
    cookie: (
      name: string,
      value: object | string,
      options?: CookieOptions
    ) => void;
    setHeader: (name: string, value: string) => NextApiResponse;
    redirect: (url: string) => NextApiResponse;
  }
}

declare global {
  var mongoose: any;
}
