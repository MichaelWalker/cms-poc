import { Block, BlockNode, Field } from "graph-cms/shared/domainTypes";

export function calculateModifictions(existingBlock: BlockNode, modifiedBlock: BlockNode) {}

export function convertFromNode(blockNode: BlockNode): Block {
    const data: Record<string, Field> = {};

    for (const { key, field } of blockNode.fieldRelations) {
        if (field.type === "block") {
            data[key] = convertFromNode(field.value.block);
        } else {
            data[key] = field.value;
        }
    }

    return {
        type: blockNode.type,
        data,
    };
}
