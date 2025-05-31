import { prisma } from "../prismaClient.js";
export default async function (app) {
    app.get("/", async () => prisma.active_financement.findMany());
    app.get("/:id", async (req) => {
        const { id } = req.params;
        return prisma.active_financement.findUnique({ where: { id: Number(id) } });
    });
    app.post("/", async (req) => {
        const { clientId, financial_asset, value } = req.body;
        return prisma.active_financement.create({
            data: {
                clientId,
                financial_asset,
                value,
            },
        });
    });
    app.put("/:id", async (req) => {
        const { id } = req.params;
        const data = req.body;
        return prisma.active_financement.update({
            where: { id: Number(id) },
            data,
        });
    });
    app.delete("/:id", async (req) => {
        const { id } = req.params;
        return prisma.active_financement.delete({ where: { id: Number(id) } });
    });
}
//# sourceMappingURL=activeFinancement.js.map