"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var clients_js_1 = require("./routes/clients.js");
var activeFinancement_js_1 = require("./routes/activeFinancement.js");
var app = (0, fastify_1.default)();
app.register(clients_js_1.default, { prefix: "/clients" });
app.register(activeFinancement_js_1.default, { prefix: "/actives" });
app.listen({ port: 3001 }, function () {
    console.log("Server rodando em http://localhost:3001");
});
