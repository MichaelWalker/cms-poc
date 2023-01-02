import { BlockDefinition } from "graph-cms";
import { BlockNode, HasBlockRelation } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { usePageEditorContext } from "../../PageEditorContext";
import { NewBlock } from "./NewBlock";

type BlockEditorProps = {
    label: string;
    blockNode: BlockNode | null;
};

function getKeysOfBlockFields(blockDefinition: BlockDefinition<any> | undefined): string[] {
    if (!blockDefinition) {
        return [];
    }

    return Object.entries(blockDefinition.fields)
        .filter(([, fieldDefinition]) => fieldDefinition.type === "block")
        .map(([key]) => key);
}

const ExistingBlock: FC<{ blockNode: BlockNode }> = ({ blockNode }) => {
    return <></>;
};

export const BlockEditor: FC<BlockEditorProps> = ({ label, blockNode }) => {
    const { blockDefinitions } = usePageEditorContext();

    if (!blockNode) {
        return <NewBlock label={label} />;
    }

    const blockDefinition = blockDefinitions.find((blockDefinition) => blockDefinition.type === blockNode.type);
    const blockKeys = getKeysOfBlockFields(blockDefinition);

    const childBlocks = blockKeys.map((key) => {
        const childBlockField = blockNode.fieldRelations.find((rel) => rel.key === key)?.field;
        const childBlockNode = childBlockField ? (childBlockField.value as HasBlockRelation).block : null;
        const childLabel = blockDefinition?.fields[key]?.label || key;

        return <BlockEditor key={key} label={childLabel} blockNode={childBlockNode} />;
    });

    return (
        <div>
            <div className="text-xs font-medium tracking-wider">{label}</div>
            <div>{blockNode.type}</div>
            <div>{childBlocks}</div>
        </div>
    );
};
