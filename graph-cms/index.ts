import { FC } from "react";
import { FieldDefinition } from "./shared/fields";
import { InferredZodSchema } from "./shared/type-utils";

type Fields<T> = {
    [K in keyof T]: FieldDefinition<T[K]>;
};

export type BlockDefinition<T extends {}> = {
    type: string;
    schema: InferredZodSchema<T>;
    component: FC<T>;
    fields: Fields<T>;
};

export function block<T extends {}>(definition: BlockDefinition<T>): BlockDefinition<T> {
    return definition;
}

export type CmsConfig = {
    blocks: BlockDefinition<any>[];
};
