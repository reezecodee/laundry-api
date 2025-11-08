import { ZodType } from "zod";

export class Validator {
  static validate<T>(schema: ZodType, data: T) {
    return schema.parse(data) as T;
  }
}
