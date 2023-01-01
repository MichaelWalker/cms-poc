import { BlockDefinition } from "graph-cms";
import { BlockNode, HasBlockRelation } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { usePageEditorContext } from "../../PageEditorContext";

type BlockEditorProps = {
    label: string;
    blockNode: BlockNode | null;
};

const NewBlock: FC = () => {
    return <div>Add new block +</div>;
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
    const { blockDefinitions } = usePageEditorContext();
    const blockDefinition = blockDefinitions.find((blockDefinition) => blockDefinition.type === blockNode.type);
    const blockKeys = getKeysOfBlockFields(blockDefinition);

    const childBlocks = blockKeys.map((key) => {
        const childBlockField = blockNode.fieldRelations.find((rel) => rel.key === key)?.field;
        const childBlockNode = childBlockField ? (childBlockField.value as HasBlockRelation).block : null;
        const label = blockDefinition?.fields[key]?.label || key;

        return <BlockEditor key={key} label={label} blockNode={childBlockNode} />;
    });

    return (
        <>
            <div>{blockNode.type}</div>
            <div>{childBlocks}</div>
        </>
    );
};

export const BlockEditor: FC<BlockEditorProps> = ({ label, blockNode }) => {
    return (
        <div>
            <div>{label}</div>
            {blockNode ? <ExistingBlock blockNode={blockNode} /> : <NewBlock />}
        </div>
    );
};
