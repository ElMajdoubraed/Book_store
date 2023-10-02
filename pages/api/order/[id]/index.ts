import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/order";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  const isAdmin = user.role === "admin";
  switch (req.method) {
    case "GET":
      try {
        const order = await Order.findOne({
          _id: req.query.id,
        })
          .populate("items.book", "title price cover")
          .exec();
        if (isAdmin || order.orderBy == user.id)
          return res.status(200).json(order);
        else return res.status(400).json({});
      } catch (error) {
        console.error("Error get order : ", error);
        res.status(400).json({ success: false, error });
      }
      break;
    case "DELETE":
      try {
        const order = await Order.findOne({
          _id: req.query.id,
        });
        if (isAdmin || order.orderBy == user.id) {
          await Order.deleteOne({ _id: req.query.id });
          return res.status(200).json(order);
        } else
          return res
            .status(400)
            .json({ success: false, message: "You don't have access" });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default auth(handler);
