import { ZodObject, ZodType, ZodTypeAny } from "zod";

type InferredZodShape<T extends {}> = {
    [K in keyof T]: ZodType<T[K]>;
};

export type InferredZodSchema<T extends {}> = ZodObject<InferredZodShape<T>>;
