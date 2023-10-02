import dbConnect from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import passport from "passport";
import "@/utils/passport";
import cookies from "@/utils/cookies";
var APP_URL = "http://localhost:3000";
if (process.env.NODE_ENV === "production")
  APP_URL = "https://kotbi.elmajdoub.live";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) {
  try {
    await dbConnect();
    await passport.authenticate("google", (err: any, token: any, info: any) => {
      if (err || !token) {
        res.redirect(`${APP_URL}/auth/login/?a=auth_fail`);
      }
      res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      res.redirect(`${APP_URL}/?a=auth_success`);
    })(req, res, next);
  } catch (error) {
    console.error("error : /callback google api", error);
  }
}

export default cookies(handler);
