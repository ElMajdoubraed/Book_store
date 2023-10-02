import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  if (user?.role !== "admin")
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });

  switch (req.method) {
    case "PUT":
      try {
        let { id } = req.query;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }).exec();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "GET":
      try {
        const users = await User.count({
          role: "user",
        }).exec();
        const admins = await User.count({
          role: "admin",
        }).exec();
        res.status(201).json({ users, admins });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default auth(handler);
