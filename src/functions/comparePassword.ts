import bcrypt from "bcrypt";

export default async function ComparePassword(
  password: string,
  encrypted: string
): Promise<boolean> {
  const hash = await bcrypt.compare(password, encrypted);
  return hash;
}
