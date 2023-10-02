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
      const statics = await Order.aggregate([
        /* if you want to get the best selling books
        {
          $match: {
            variant: "delivered",
          },
        },
        */
        {
          $unwind: "$items",
        },
        {
          $group: {
            _id: "$items.book",
            total: {
              $sum: "$items.quantity",
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "book",
          },
        },
        {
          $unwind: "$book",
        },
        {
          $project: {
            _id: 0,
            book: {
              _id: 1,
              title: 1,
              cover: 1,
            },
            total: 1,
          },
        },
      ]);
      res.status(200).json(statics);
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default auth(handler);
