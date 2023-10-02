import cookies from "@/utils/cookies";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.cookie("accessToken", "", { maxAge: -1 });
  res.status(200).json({ success: true });
};

export default cookies(handler);
