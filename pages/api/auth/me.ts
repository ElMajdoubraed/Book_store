import auth from "@/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    provider: string;
  };
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id, name, email, role, provider } = req.user;
  res.status(200).json({
    data: {
      id,
      name,
      email,
      role,
      provider,
    },
  });
};

export default auth(handler);
