import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/order";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  if (user?.role !== "admin")
    return res.status(403).json({
      message: "You are not authorized to access this resource",
    });

  switch (req.method) {
    case "GET":
      try {
        let { status } = req.query;
        status = status === "all" ? "" : status;
        const orders = await Order.find({
          variant: { $regex: status, $options: "i" },
        })
          .populate("orderBy", "name")
          .sort({ createdAt: -1 })
          .exec();
        res.status(201).json(orders);
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;
    case "DELETE":
      try {
        let { id } = req.query;
        await Order.findByIdAndDelete(id);
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "POST":
      try {
        let { id } = req.query;
        const order = await Order.findOne({
          _id: id,
        })
          .populate("items.book", "title price cover")
          .populate("orderBy", "name")
          .exec();
        res.status(201).json(order);
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "PUT":
      try {
        let { id } = req.query;
        const { status, variant } = req.body;
        const order = await Order.findByIdAndUpdate(id, { status, variant });
        res.status(201).json(order);
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
