import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../databse";
import { randomUUID } from "crypto";

export default async function UsersRoute(app: FastifyInstance) {
  app.post("/", async (request, replay) => {
    const createBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    const { name, email } = createBodySchema.parse(request.body);

    const resposne = await knex("users").insert({
      id: randomUUID(),
      email,
      name,
    });

    return replay.status(201).send({ user: resposne });
  });
}
