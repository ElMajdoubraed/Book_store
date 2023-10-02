import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/order";
import dbConnect from "@/utils/dbConnect";
import sendEmail from "@/utils/sendEmail";
import { EmailSubject, EmailTemplate } from "@/constants/emails/HandleOrder";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const user = req.user;
  switch (req.method) {
    case "POST":
      try {
        const { totalPrice, location, items } = req.body;
        const order = await Order.create({
          orderBy: user.id,
          totalPrice,
          location,
          items,
        });
        const link = `${process.env.NEXT_PUBLIC_APP_URL}/~/orders/${order._id}`;
        const body = EmailTemplate(link);
        const message = await sendEmail(user.email, EmailSubject, body);
        res.status(200).json(order._id);
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "GET":
      try {
        const orders = await Order.find(
          {
            orderBy: user.id,
          },
          {
            createdAt: 1,
            status: 1,
            totalPrice: 1,
          }
        ).sort({
          createdAt: -1,
        });
        res.status(200).json(orders);
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
