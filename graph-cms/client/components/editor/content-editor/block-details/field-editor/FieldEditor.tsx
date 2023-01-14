import { getBlockDefinition } from "graph-cms/shared/block-utils";
import { BlockNode, HasFieldRelation } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { usePageEditorContext } from "../../../PageEditorContext";
import { BlockFieldEditor } from "./BlockFieldEditor";

type FieldEditorProps = {
    fieldRelation: HasFieldRelation;
    block: BlockNode;
};

export const FieldEditor: FC<FieldEditorProps> = ({ fieldRelation, block }) => {
    const { blockDefinitions } = usePageEditorContext();
    const blockDefinition = getBlockDefinition(blockDefinitions, block.type);
    const fieldDefinition = blockDefinition.fields[fieldRelation.key];

    if (!fieldDefinition) {
        throw new Error(`Field definition not found for ${fieldRelation.key} in block ${block.type}`);
    }

    switch (fieldRelation.field.type) {
        case "block":
            return <BlockFieldEditor fieldRelation={fieldRelation} fieldDefinition={fieldDefinition} />;
        default:
            return <div>Not implemented</div>;
    }
};
