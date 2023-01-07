import { FieldNodeValue, HasBlockRelation } from "./domainTypes";
import { v4 as uuid } from "uuid";

export type FieldDefinition<T extends FieldNodeValue> = {
    type: "text" | "image" | "link" | "block" | "number" | "boolean";
    label: string;
    description?: string;
    optional?: boolean;
    fallbackValue: T;
};

type FieldDefinitionOptions<T extends FieldNodeValue> = Omit<FieldDefinition<T>, "type" | "fallbackValue"> &
    Partial<Pick<FieldDefinition<T>, "fallbackValue">>;

export function textField(options: FieldDefinitionOptions<string>): FieldDefinition<string> {
    return {
        type: "text" as const,
        fallbackValue: "Placeholder",
        ...options,
    };
}

export function imageField(options: FieldDefinitionOptions<string>): FieldDefinition<string> {
    return {
        type: "image" as const,
        fallbackValue: "https://via.placeholder.com/600x400?text=Placeholder",
        ...options,
    };
}

export function blockField(options: FieldDefinitionOptions<HasBlockRelation>): FieldDefinition<HasBlockRelation> {
    return {
        type: "block" as const,
        fallbackValue: {
            block: {
                id: uuid(),
                type: "placeholder",
                fieldRelations: [],
            },
        },
        ...options,
    };
}
