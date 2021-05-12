import fastify from "fastify";

const app = fastify();

app.get("/", (request, reply) => {
  reply.send("Hello, world!");
});
