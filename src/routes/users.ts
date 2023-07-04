import { FastifyInstance } from "fastify";

export default async function UsersRoute(app: FastifyInstance) {
  app.get("/:id", () => {
    return "Get User";
  });

  app.post("/", () => {
    return "Create User";
  });
}
