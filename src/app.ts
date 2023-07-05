import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import MealsRoutes from "./routes/meals";
import UsersRoute from "./routes/users";
import LoginRoutes from "./routes/login";

export const app = fastify();

app.register(fastifyCookie);

app.addHook("preHandler", async (request, replay) => {
  console.log(`[${request.method}] ${request.url}`);
});

app.register(MealsRoutes, { prefix: "meals" });
app.register(UsersRoute, { prefix: "users" });
app.register(LoginRoutes, { prefix: "login" });
