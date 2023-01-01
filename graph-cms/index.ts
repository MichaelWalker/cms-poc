import { FC } from "react";
import { renderPlaceholder } from "./client/components/editor/placeholder-block/PlaceholderBlock";
import { Block } from "./shared/domainTypes";
import { FieldDefinition } from "./shared/fields";
import { InferredZodSchema } from "./shared/type-utils";

type Fields<T> = {
    [K in keyof T]: FieldDefinition<T[K]>;
};

export type BlockDefinition<T extends {}> = {
    type: string;
    schema: InferredZodSchema<T>;
    fields: Fields<T>;
    component: FC<T>;
};

export function block<T extends {}>(definition: BlockDefinition<T>): BlockDefinition<T> {
    return definition;
}

export function createRenderer(blockDefinitions: BlockDefinition<any>[]): FC<any> {
    return (block: Block) => {
        if (!block || !block.type) {
            return renderPlaceholder();
        }

        const definition = blockDefinitions.find((def) => def.type === block.type);

        if (!definition) {
            throw new Error(`Block type "${block.type}" not found`);
        }

        return definition.component(block.data);
    };
}

export type CmsConfig = {
    blocks: BlockDefinition<any>[];
};
