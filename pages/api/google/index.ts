import passport from "passport";
import dbConnect from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import "@/utils/passport";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) {
  await dbConnect();
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })(req, res, next);
}
