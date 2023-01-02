import { BlockNode, FieldNode, HasBlockRelation, HasFieldRelation } from "graph-cms/shared/domainTypes";
import { GetByPageIdRequest } from "graph-cms/shared/validations";

export function getRootBlockForPage({ pageId }: GetByPageIdRequest): BlockNode | null {
    return {
        id: "1",
        type: "page",
        fieldRelations: [],
    };
}

export function saveBlockNode(newNode: BlockNode, parentId: string) {
    const oldNode = tryGetById(newNode.id);

    if (!oldNode) {
        createBlock(newNode, parentId);
        return;
    }

    updateBlock(newNode, oldNode);
}

function createBlock(blockNode: BlockNode, parentId: string) {
    createBlockNode(blockNode, parentId);

    for (const fieldRelation of blockNode.fieldRelations) {
        createField(fieldRelation, blockNode.id);
    }
}

function updateBlock(newNode: BlockNode, oldNode: BlockNode) {
    for (const newFieldRelation of newNode.fieldRelations) {
        const oldFieldRelation = tryFindFieldRelation(oldNode, newFieldRelation);
        if (!oldFieldRelation) {
            createField(newFieldRelation, newNode.id);
        } else {
            updateFieldRelation(newFieldRelation, oldFieldRelation, newNode.id);
        }
    }

    for (const fieldRelation of oldNode.fieldRelations) {
        if (!includesFieldRelation(newNode, fieldRelation)) {
            deleteField(fieldRelation.field);
        }
    }
}

function updateFieldRelation(newFieldRelation: HasFieldRelation, oldFieldRelation: HasFieldRelation, parentId: string) {
    if (newFieldRelation.field.id === oldFieldRelation.field.id) {
        updateField(newFieldRelation.field, oldFieldRelation.field);
    } else {
        deleteField(oldFieldRelation.field);
        createField(newFieldRelation, parentId);
    }
}

function createField(fieldRelation: HasFieldRelation, parentId: string) {
    const field = fieldRelation.field;
    createFieldNode(field, parentId, fieldRelation.key);

    if (field.type === "block") {
        createBlock(field.value.block, field.id);
    }
}

function updateField(newNode: FieldNode, oldNode: FieldNode) {
    if (newNode.type === "block") {
        updateBlock(newNode.value.block, (oldNode.value as HasBlockRelation).block);
    } else {
        updateFieldNode(newNode);
    }
}

function deleteField(fieldNode: FieldNode) {
    deleteFieldNode(fieldNode);
}

function createBlockNode(blockNode: BlockNode, parentId: string) {
    // MATCH (parent)
    // WHERE parent.id = $parentId
    // CREATE (parent)-[:HAS_BLOCK]->(:Block { id: $id, type: $type })
}

function createFieldNode(fieldNode: FieldNode, parentId: string, key: string) {
    // MATCH (parent)
    // WHERE parent.id = $parentId
    // CREATE (parent)-[:HAS_FIELD] { key: $key }]->(:Field { id: $id, type: $type, value: $value })
}

function updateFieldNode({ id, value }: FieldNode) {
    // MATCH (field:Field)
    // WHERE field.id = $id
    // SET field.value = $value
}

function deleteFieldNode({ id }: FieldNode) {
    // MATCH (field:Field)-[rel]->(child)
    // WHERE field.id = $id;
    // DELETE field, rel, child
}

function tryGetById(id: string): BlockNode | null {
    return null;
}

function includesFieldRelation(blockNode: BlockNode, fieldRelation: HasFieldRelation): boolean {
    const relationKeys = blockNode.fieldRelations.map((relation) => relation.key);
    return relationKeys.includes(fieldRelation.key);
}

function tryFindFieldRelation(blockNode: BlockNode, fieldRelation: HasFieldRelation): HasFieldRelation | null {
    return null;
}
