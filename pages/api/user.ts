import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { User } from '@prisma/client';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const users: User = req.body;

  try {
    if (req.method === "POST") {


      const result = await prisma.user.create({
        data: {
          nombre: users.nombre,
          password: users.password,
          username: users.username,
        }
      });
      res.json(result);
    }

    if (req.method === "PUT") {
      const result = await prisma.user.update({
        where: { id: users.id  },
        data: {
          nombre: users.nombre,
          password: users.password,
          username: users.username,
        }
      });
      res.json(result);
    }
    if (req.method === "DELETE") {
      const result = await prisma.user.delete({
        where: { id: users.id  }
      });
      res.json(result);
    }
  }
  catch (err) {
    console.log(err)
  }


}