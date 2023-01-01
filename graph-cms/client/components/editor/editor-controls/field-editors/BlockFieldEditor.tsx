import { BlockNode } from "graph-cms/shared/domainTypes";
import { FieldDefinition } from "graph-cms/shared/fields";
import { FC } from "react";

type BlockFieldEditorProps = {
    fieldDefinition: FieldDefinition<BlockNode>;
    blockNode: BlockNode | null;
};

export const BlockFieldEditor: FC<BlockFieldEditorProps> = ({ blockNode }) => {
    if (!blockNode) {
        return <div></div>;
    }
    return <></>;
};
