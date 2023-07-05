import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionId(
  request: FastifyRequest,
  replay: FastifyReply
) {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return replay.status(401).send({ error: "Unauthhorized" });
  }
}
