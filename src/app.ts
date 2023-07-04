import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyCookie);

app.addHook("preHandler", async (request, replay) => {
  console.log(`[${request.method}] ${request.url}`);
});

app.get("/", () => {
  return "Hello World";
});
