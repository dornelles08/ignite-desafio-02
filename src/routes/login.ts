import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../databse";
import ComparePassword from "../functions/comparePassword";

export default async function LoginRoutes(app: FastifyInstance) {
  app.post("/", async (request, replay) => {
    const createBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = createBodySchema.parse(request.body);

    const user = await knex("users").where({ email }).select().first();

    if (!user) {
      return replay.status(401).send({ error: "Unauthhorized" });
    }

    const passwordCorrectly = await ComparePassword(password, user.password);

    if (!passwordCorrectly) {
      return replay.status(401).send({ error: "Unauthhorized" });
    }

    replay.cookie("sessionId", user.id, {
      path: "/",
      maxAge: 1000 * 60 * 60, // 1 hours
    });

    return replay.status(200).send();
  });
}
