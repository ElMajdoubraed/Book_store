//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import Book from "@/models/book";
import dbConnect from "@/utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { page, sort, category, limit = 9, search = "" } = req.query;
        const where = {};
        if (search && search !== "") {
          where["title"] = { $regex: search, $options: "i" };
        }
        if (category && category !== "") {
          where["category"] = category;
        }

        const { books, pages } = await Book.paginate({
          page,
          limit,
          sort,
          where,
        });
        res.status(200).json({ books, pages });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default handler;
