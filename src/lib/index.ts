import slugify from "slugify";
import { customAlphabet } from "nanoid";

export const generateSlug = (name: string) => {
  const nanoId = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
  const baseSlug = slugify(name, { lower: true, strict: true });
  return baseSlug + "-" + nanoId();
};
