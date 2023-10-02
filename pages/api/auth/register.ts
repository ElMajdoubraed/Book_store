import dbConnect from "@/utils/dbConnect";
import cookies from "@/utils/cookies";
import User from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({});
    return;
  }
  await dbConnect();
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const result = user.signJwt();
    res.cookie("accessToken", result.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

export default cookies(handler);
