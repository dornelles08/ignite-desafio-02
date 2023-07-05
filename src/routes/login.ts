import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../databse";

export default async function LoginRoutes(app: FastifyInstance) {
  app.post("/", async (request, replay) => {
    const createBodySchema = z.object({
      email: z.string().email(),
    });

    const { email } = createBodySchema.parse(request.body);

    const user = await knex("users").where({ email }).select().first();

    if (!user) {
      return replay.status(401).send({ error: "Unauthhorized" });
    }

    replay.cookie("sessionId", user.id, {
      path: "/",
      maxAge: 1000 * 60 * 60, // 1 hours
    });

    return replay.status(200).send();
  });
}
