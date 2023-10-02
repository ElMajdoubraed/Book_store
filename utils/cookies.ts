import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

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

const cookie = (
  res: NextApiResponse,
  name: string,
  value: object,
  options: CookieOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  }
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
  }
  options.path = options?.path || "/";

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

const cookies =
  (handler: Function) => (req: NextApiRequest, res: NextApiResponse) => {
    res.cookie = (
      name: string,
      value: object | string,
      options?: CookieOptions | undefined
    ) => cookie(res, name, value as object, options);
    return handler(req, res);
  };

export default cookies;
