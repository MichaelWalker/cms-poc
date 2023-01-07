import { BlockDefinition } from "graph-cms";
import { Block, BlockNode, Field, FieldNode, HasFieldRelation } from "graph-cms/shared/domainTypes";
import { v4 as uuid } from "uuid";

// TODO can I improve these types?
export function getBlockDefinition(blockDefinitions: BlockDefinition<any>[], blockType: string): BlockDefinition<any> {
    const definition = blockDefinitions.find((definition) => definition.type === blockType);

    if (!definition) {
        throw new Error(`No block definition found for block type "${blockType}"`);
    }

    return definition;
}

export function convertFromNode(blockDefinitions: BlockDefinition<any>[], blockNode: BlockNode | null): Block {
    if (!blockNode || !blockNode.type || blockNode.type === "placeholder") {
        return {
            type: "placeholder",
            data: {},
        };
    }

    const blockDefinition = getBlockDefinition(blockDefinitions, blockNode.type);
    const data: Record<string, Field> = {};

    for (const [property, fieldDefinition] of Object.entries(blockDefinition.fields)) {
        const fieldRelation = blockNode.fieldRelations.find((relation) => relation.key === property);

        if (!fieldRelation) {
            if (isBlockNode(fieldDefinition.fallbackValue)) {
                data[property] = convertFromNode(blockDefinitions, fieldDefinition.fallbackValue);
            } else {
                data[property] = fieldDefinition.fallbackValue;
            }
        } else {
            if (fieldRelation.field.type === "block") {
                data[property] = convertFromNode(blockDefinitions, fieldRelation.field.value.block);
            } else {
                data[property] = fieldRelation.field.value;
            }
        }
    }

    return {
        type: blockNode.type,
        data,
    };
}

export function getBlockFromBlockField(field: FieldNode): BlockNode {
    if (field.type !== "block") {
        throw new Error("Field is not a block field");
    }

    return field.value.block;
}

export function createInitialBlockNodeFromDefinition(blockDefinition: BlockDefinition<any>): BlockNode {
    return {
        id: uuid(),
        type: blockDefinition.type,
        fieldRelations: Object.entries(blockDefinition.fields).map(([key, fieldDefinition]) => {
            return {
                key,
                field: {
                    id: uuid(),
                    type: fieldDefinition.type,
                    value: fieldDefinition.fallbackValue,
                },
            } as HasFieldRelation;
        }),
    };
}

function isBlockNode(value: any): value is BlockNode {
    return value && value.id && value.type && value.fieldRelations;
}
