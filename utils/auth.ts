import User from "@/models/user";
import dbConnect from "./dbConnect";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

interface DecodedInterface {
  id: string;
  iat: number;
  exp: number;
}

async function check(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const decoded: DecodedInterface = jwt.verify(
    req.cookies?.accessToken as string,
    process.env.JWT_SECRET as string
  ) as DecodedInterface;
  if (decoded?.id) {
    const user = await User.findById(decoded.id);
    if (user) return user;
  }
  throw new Error();
}

const auth =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      req.user = await check(req, res);
      return handler(req, res);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "أنت غير مصرح لك بالدخول لهذه الصفحة !",
        error: error,
      });
    }
  };

export default auth;
