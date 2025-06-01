import { prisma } from "../prismaClient.js";
export default async function (app) {
    app.get("/", async (__, reply) => {
        try {
            const response = await prisma.client.findMany();
            if (!response) {
                throw new Error("Não foi possível buscar os clientes.");
            }
            return reply.code(200).send({
                message: "conexão com a base de dados ativa",
                data: response,
                code: 200,
            });
        }
        catch (Exception) {
            reply.code(500).send({
                error: "Erro ao buscar os clientes.",
                cause: Exception,
                code: 500,
            });
        }
    });
    app.get("/:id", async (req, reply) => {
        try {
            const { id } = req.params;
            const response = await prisma.client.findUnique({
                where: { id: Number(id) },
            });
            if (!response) {
                throw new Error(`Não foi encontrado o registro do número ${id}`);
            }
            return reply.code(200).send(response);
        }
        catch (Exception) {
            reply.code(500).send({
                error: "Erro ao buscar os clientes.",
                cause: Exception,
            });
        }
    });
    app.post("/", async (req, reply) => {
        try {
            const { name, email, status } = req.body;
            const response = await prisma.client.create({
                data: { name, email, status },
            });
            if (!response) {
                throw new Error("Não foi possível cadastrar o cliente.");
            }
            return reply.code(200).send({
                message: "Cliente cadastrado com sucesso.",
                data: response,
                code: 200,
            });
        }
        catch (Exception) {
            reply.code(500).send({
                error: "Erro ao cadastrar clientes.",
                code: 500,
                cause: Exception,
            });
        }
    });
    app.put("/:id", async (req, reply) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const response = await prisma.client.update({
                where: { id: Number(id) },
                data,
            });
            if (!response) {
                throw new Error("Não foi possível editar o cliente.");
            }
            return reply.code(200).send({
                message: "Cliente editado com sucesso.",
                data: response,
            });
        }
        catch (Exception) {
            reply.code(500).send({
                error: "Erro ao editar registro de cliente.",
                cause: Exception,
            });
        }
    });
    app.delete("/:id", async (req, reply) => {
        try {
            const { id } = req.params;
            const response = await prisma.client.delete({
                where: { id: Number(id) },
            });
            if (!response) {
                throw new Error("Não foi possível deletar o cliente da nossa base de dados");
            }
            return reply.code(200).send({
                message: "Cliente deletado com sucesso.",
                data: response,
                code: 200,
            });
        }
        catch (Exception) {
            reply.code(500).send({
                error: "Erro ao deletar registro de cliente.",
                cause: Exception,
                code: 500,
            });
        }
    });
}
//# sourceMappingURL=clients.js.map