import { Block } from "./domainTypes";

export type FieldDefinition<T> = {
    type: "text" | "image" | "link" | "block" | "number" | "boolean";
    label: string;
    description?: string;
    optional?: boolean;
    defaultValue?: T | undefined;
};

type FieldDefinitionOptions<T> = Omit<FieldDefinition<T>, "type">;

export function textField(options: FieldDefinitionOptions<string>) {
    return {
        type: "text" as const,
        ...options,
    };
}

export function imageField(options: FieldDefinitionOptions<string>) {
    return {
        type: "image" as const,
        ...options,
    };
}

export function blockField(options: FieldDefinitionOptions<Block>) {
    return {
        type: "block" as const,
        ...options,
    };
}
