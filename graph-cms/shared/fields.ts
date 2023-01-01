import { placeholderBlockNode } from "graph-cms/client/components/editor/placeholder-block/PlaceholderBlock";
import { BlockNode } from "./domainTypes";

export type FieldDefinition<T> = {
    type: "text" | "image" | "link" | "block" | "number" | "boolean";
    label: string;
    description?: string;
    optional?: boolean;
    fallbackValue: T;
};

type FieldDefinitionOptions<T> = Omit<FieldDefinition<T>, "type" | "fallbackValue"> &
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

export function blockField(options: FieldDefinitionOptions<BlockNode>): FieldDefinition<BlockNode> {
    return {
        type: "block" as const,
        fallbackValue: placeholderBlockNode(),
        ...options,
    };
}
