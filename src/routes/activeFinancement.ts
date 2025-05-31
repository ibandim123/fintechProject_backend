import { FastifyInstance } from "fastify";
import { prisma } from "../prismaClient.js";

export default async function (app: FastifyInstance) {
  app.get("/", async () => prisma.active_financement.findMany());

  app.get("/:id", async (req: any) => {
    const { id } = req.params as { id: string };
    return prisma.active_financement.findUnique({ where: { id: Number(id) } });
  });

  app.post("/", async (req: any) => {
    const { clientId, financial_asset, value } = req.body as any;
    return prisma.active_financement.create({
      data: {
        clientId,
        financial_asset,
        value,
      },
    });
  });

  app.put("/:id", async (req: any) => {
    const { id } = req.params as { id: string };
    const data = req.body as any;
    return prisma.active_financement.update({
      where: { id: Number(id) },
      data,
    });
  });

  app.delete("/:id", async (req: any) => {
    const { id } = req.params as { id: string };
    return prisma.active_financement.delete({ where: { id: Number(id) } });
  });
}
