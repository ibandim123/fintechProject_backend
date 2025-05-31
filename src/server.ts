import Fastify from "fastify";
import clientRoutes from "./routes/clients.js";
import activeRoutes from "./routes/activeFinancement.js";
import cors from "@fastify/cors";

const app = Fastify();

app.register(clientRoutes, { prefix: "/clients" });
app.register(activeRoutes, { prefix: "/actives" });

await app.register(cors, {
  origin: "http://localhost:3000",
  methods: "*",
});

app.listen({ port: 3001 }, () => {
  console.log("Server rodando em http://localhost:3001");
});
