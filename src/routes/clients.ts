import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { prisma } from "../prismaClient.js";

export default async function (app: FastifyInstance) {
  app.get("/", async (__, reply: FastifyReply) => {
    try {
      const response = await prisma.client.findMany();

      if (!response) {
        throw "Não foi possível buscar os clientes.";
      }

      return reply.code(200).send(response);
    } catch (Exception: FastifyError | any) {
      reply.status(500).send({
        error: "Erro ao buscar os clientes.",
        cause: Exception,
      });
    }
  });

  app.get(
    "/:id",
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const { id } = req.params as { id: string };
        const response = await prisma.client.findUnique({
          where: { id: Number(id) },
        });

        if (!response) {
          throw `Não foi encontrado o registro do número ${id}`;
        }

        return reply.code(200).send(response);
      } catch (Exception: FastifyError | any) {
        reply.status(500).send({
          error: "Erro ao buscar os clientes.",
          cause: Exception,
        });
      }
    }
  );

  app.post(
    "/",
    async (
      req: FastifyRequest<{
        Body: { name: string; email: string; status: string };
      }>,
      reply
    ) => {
      try {
        const { name, email, status } = req.body as any;
        const response = await prisma.client.create({
          data: { name, email, status },
        });

        if (!response) {
          throw "Não foi possível cadastrar o cliente.";
        }

        return reply.send(200).send({
          message: "Cliente cadastrado com sucesso.",
          data: response,
        });
      } catch (Exception: FastifyError | any) {
        reply.status(500).send({
          error: "Erro ao cadastrar clientes.",
          cause: Exception,
        });
      }
    }
  );

  app.put(
    "/:id",
    async (
      req: FastifyRequest<{ Params: { id: string }; Body: any }>,
      reply
    ) => {
      try {
        const { id } = req.params as { id: string };
        const data = req.body as any;

        const response = await prisma.client.update({
          where: { id: Number(id) },
          data,
        });

        if (!response) {
          throw "Não foi possível editar o cliente.";
        }

        return reply.code(200).send({
          message: "Cliente editado com sucesso.",
          data: response,
        });
      } catch (Exception) {
        reply.status(500).send({
          error: "Erro ao editar registro de cliente.",
          cause: Exception,
        });
      }
    }
  );

  app.delete(
    "/:id",
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const { id } = req.params as { id: string };
        const response = await prisma.client.delete({
          where: { id: Number(id) },
        });

        if (!response) {
          throw "Não foi possível deletar o cliente.";
        }

        return reply.code(200).send({
          message: "Cliente deletado com sucesso.",
          data: response,
        });
      } catch (Exception) {
        reply.status(500).send({
          error: "Erro ao deletar registro de cliente.",
          cause: Exception,
        });
      }
    }
  );
}
