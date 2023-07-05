import bcrypt from "bcrypt";
import { env } from "../env";

export default async function HashPassword(password: string): Promise<string> {
  const { SALT } = env;
  const hash = await bcrypt.hash(password, SALT);
  return hash;
}
