import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import MealsRoutes from "./routes/meals";
import UsersRoute from "./routes/users";

export const app = fastify();

app.register(fastifyCookie);

app.addHook("preHandler", async (request, replay) => {
  console.log(`[${request.method}] ${request.url}`);
});

app.register(MealsRoutes, { prefix: "meals" });
app.register(UsersRoute, { prefix: "users" });
