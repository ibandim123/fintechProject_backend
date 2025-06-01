import { FastifyError, FastifyInstance, FastifyReply } from "fastify";
import { prisma } from "../prismaClient.js";

export default async function (app: FastifyInstance) {
  app.get("/", async (__, reply: FastifyReply) => {
    try {
      const response = prisma.active_financement.findMany();

      if (!response) {
        throw new Error("Não foi possível buscar os ativos financeiros");
      }

      return reply.code(200).send({
        message: "conexão com a base de dados ativa",
        data: response,
        code: 200,
      });
    } catch (Exception: FastifyError | any) {
      reply.code(500).send({
        error: "Erro ao buscar os ativos financeiros.",
        cause: Exception,
        code: 500,
      });
    }
  });

  app.get("/:id", async (req: any, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string };
      const response = await prisma.active_financement.findUnique({
        where: { id: Number(id) },
      });

      return reply.code(200).send({
        message: "Usuário possui ativos financeiros",
        data: response,
        code: 200,
      });
    } catch (Exception: FastifyError | any) {
      reply.code(500).send({
        error: "Erro ao buscar os ativos financeiros.",
        cause: Exception,
        code: 500,
      });
    }
  });

  // à fazer, as requisições do Financement não estão prontas ainda
  /*
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
  */
}
