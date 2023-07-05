import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../databse";
import { randomUUID } from "crypto";
import HashPassword from "../functions/hashPassword";

export default async function UsersRoute(app: FastifyInstance) {
  app.post("/", async (request, replay) => {
    const createBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const { name, email, password } = createBodySchema.parse(request.body);

    const hashPassword = await HashPassword(password);

    const resposne = await knex("users").insert({
      id: randomUUID(),
      email,
      name,
      password: hashPassword,
    });

    return replay.status(201).send({ user: resposne });
  });
}
