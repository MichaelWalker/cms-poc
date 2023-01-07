import { KeyboardFocusable } from "graph-cms/client/components/keyboard-focusable/KeyboardFocusable";
import { getBlockFromBlockField } from "graph-cms/server/block-utils";
import { BlockNode, FieldNode } from "graph-cms/shared/domainTypes";
import { FC } from "react";

type BlockListItemProps = {
    label: string;
    block: BlockNode | null;
    field: FieldNode | null;
    goToCreateBlock: (label: string, fieldNode: FieldNode | null) => void;
    goToBlockDetails: (label: string, blockNode: BlockNode, fieldNode: FieldNode | null) => void;
};

export const BlockListItem: FC<BlockListItemProps> = ({ label, block, field, goToCreateBlock, goToBlockDetails }) => {
    if (block && block.type !== "placeholder") {
        const childBlockRelations = block.fieldRelations.filter(
            (fieldRelation) => fieldRelation.field.type === "block"
        );

        return (
            <>
                <KeyboardFocusable>
                    <button
                        onClick={() => goToBlockDetails(label, block, field)}
                        className="mb-2 w-full rounded bg-gray-200 px-8 py-2 text-left transition-colors hover:bg-fuchsia-200"
                    >
                        <span className="block text-xs font-medium tracking-wider">{label}</span>
                        <span>{block.type}</span>
                    </button>
                </KeyboardFocusable>
                <ol className="pl-8">
                    {childBlockRelations.map((child) => (
                        <li key={child.key}>
                            <BlockListItem
                                label={child.key}
                                block={getBlockFromBlockField(child.field)}
                                field={child.field}
                                goToCreateBlock={goToCreateBlock}
                                goToBlockDetails={goToBlockDetails}
                            />
                        </li>
                    ))}
                </ol>
            </>
        );
    }

    return (
        <KeyboardFocusable>
            <button
                onClick={() => goToCreateBlock(label, field)}
                className="mb-2 w-full rounded bg-gray-200 px-8 py-2 text-left transition-colors hover:bg-fuchsia-200"
            >
                <span className="block text-xs font-medium tracking-wider">{label}</span>
                <span>Empty - click to add</span>
            </button>
        </KeyboardFocusable>
    );
};
