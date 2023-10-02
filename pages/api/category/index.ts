import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Category from "@/models/category";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  if (user?.role !== "admin")
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });

  switch (req.method) {
    case "POST":
      try {
        const { name, description } = req.body;
        const newCategory = new Category({
          name,
          description,
          addBy: user.id,
        });
        await newCategory.save();
        res.status(201).json(newCategory._id);
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
