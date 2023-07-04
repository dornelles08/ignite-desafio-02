import { FastifyInstance } from "fastify";
import { z } from "zod";

export default async function MealsRoutes(app: FastifyInstance) {
  app.get("/", () => {
    return "All Meals";
  });

  app.post("/", () => {
    return "Create Meals";
  });

  app.get("/:id", (request) => {
    const getParamsSchema = z.object({
      id: z.string(),
    });

    const { id } = getParamsSchema.parse(request.params);

    return `Get Meal - ${id}`;
  });

  app.get("/metrics", () => {
    return "Metrics of all Meal";
  });

  app.put("/:id", () => {
    return "Update Meal";
  });

  app.delete("/:id", () => {
    return "Delete Meal";
  });
}
