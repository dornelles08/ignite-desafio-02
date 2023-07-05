import { FastifyInstance } from "fastify";
import { z } from "zod";
import { checkSessionId } from "../middlewares/check-session-id";
import { knex } from "../databse";
import { randomUUID } from "crypto";
import ConvertIsOnDietToBoolena from "../utils/convert-is_on_diet-to-boolean";

export default async function MealsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionId],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const meals = await knex("meals").where({ user_id: sessionId }).select();

      return { meals: meals.map(ConvertIsOnDietToBoolena) };
    }
  );

  app.post(
    "/",
    {
      preHandler: [checkSessionId],
    },
    async (request, replay) => {
      const { sessionId } = request.cookies;

      const createBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        date: z.string(),
        hour: z.string(),
        is_on_diet: z.boolean(),
      });

      const { name, description, date, hour, is_on_diet } =
        createBodySchema.parse(request.body);

      await knex("meals").insert({
        id: randomUUID(),
        name,
        description,
        date,
        hour,
        is_on_diet,
        user_id: sessionId,
      });

      return replay.status(201).send();
    }
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionId],
    },
    async (request, replay) => {
      const { sessionId } = request.cookies;

      const getParamsSchema = z.object({
        id: z.string(),
      });

      const { id } = getParamsSchema.parse(request.params);

      const meal = await knex("meals")
        .where({
          id,
          user_id: sessionId,
        })
        .select()
        .first();

      if (!meal) {
        return replay.status(404).send({ message: "Meal not found" });
      }

      return { meal: ConvertIsOnDietToBoolena(meal) };
    }
  );

  app.get(
    "/metrics",
    {
      preHandler: [checkSessionId],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      let meals = await knex("meals").where({ user_id: sessionId }).select();
      meals = meals.map(ConvertIsOnDietToBoolena);

      const on_diet = meals.filter(({ is_on_diet }) => is_on_diet === true);

      return {
        metrics: {
          total: meals.length,
          on_diet: on_diet.length,
          off_diet: meals.length - on_diet.length,
          better_sequence: "",
        },
      };
    }
  );

  app.put(
    "/:id",
    {
      preHandler: [checkSessionId],
    },
    async (request, replay) => {
      const { sessionId } = request.cookies;

      const getParamsSchema = z.object({
        id: z.string(),
      });

      const { id } = getParamsSchema.parse(request.params);

      const meal = await knex("meals")
        .where({
          id,
          user_id: sessionId,
        })
        .select()
        .first();

      if (!meal) {
        return replay.status(404).send({ message: "Meal not found" });
      }

      const updateBodySchema = z.object({
        name: z.string().nullish(),
        description: z.string().nullish(),
        date: z.string().nullish(),
        hour: z.string().nullish(),
        is_on_diet: z.boolean().nullish(),
      });

      const { date, description, hour, is_on_diet, name } =
        updateBodySchema.parse(request.body);

      await knex("meals")
        .where({
          id,
          user_id: sessionId,
        })
        .update({
          date: date ? date : undefined,
          description: description ? description : undefined,
          hour: hour ? hour : undefined,
          is_on_diet: is_on_diet ? is_on_diet : undefined,
          name: name ? name : undefined,
        });

      return replay.status(204).send();
    }
  );

  app.delete(
    "/:id",
    {
      preHandler: [checkSessionId],
    },
    async (request, replay) => {
      const { sessionId } = request.cookies;
      const getParamsSchema = z.object({
        id: z.string(),
      });

      const { id } = getParamsSchema.parse(request.params);

      const meal = await knex("meals")
        .where({
          id,
          user_id: sessionId,
        })
        .delete();

      if (!meal) {
        return replay.status(404).send({ message: "Meal not found" });
      }

      return replay.status(204).send();
    }
  );
}
