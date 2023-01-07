import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { BlockDefinition } from "graph-cms";
import { IconButton } from "graph-cms/client/components/buttons/LinkButton";
import { KeyboardFocusable } from "graph-cms/client/components/keyboard-focusable/KeyboardFocusable";
import { BlockNode, FieldNode } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { usePageEditorContext } from "../../PageEditorContext";
import { v4 as uuid } from "uuid";
import { createInitialBlockNodeFromDefinition } from "graph-cms/server/block-utils";

type CreateBlockProps = {
    label: string;
    field: FieldNode | null;
    goToPageSummary: () => void;
    goToBlockDetails: (label: string, block: BlockNode, field: FieldNode | null) => void;
};

export const CreateBlock: FC<CreateBlockProps> = ({ label, field, goToPageSummary, goToBlockDetails }) => {
    const { createBlock, blockDefinitions } = usePageEditorContext();

    function handleBlockSelected(blockDefinition: BlockDefinition<any>) {
        const blockNode = createInitialBlockNodeFromDefinition(blockDefinition);
        createBlock(blockNode, field);
        goToBlockDetails(label, blockNode, field);
    }

    return (
        <>
            <div className="relative bg-gray-gradient p-8">
                <h2 className="text-4xl text-white">Create Block</h2>
                <IconButton onClick={() => goToPageSummary()} className="absolute right-8 top-8">
                    <ArrowLeftIcon width={20} height={20} />
                </IconButton>
            </div>
            <div className="p-8">
                <h3 className="mb-4 text-2xl">Select Block Type</h3>
                <ol>
                    {blockDefinitions.map((blockDefinition) => (
                        <li key={blockDefinition.type}>
                            {
                                <KeyboardFocusable>
                                    <button
                                        onClick={() => handleBlockSelected(blockDefinition)}
                                        className="mb-2 w-full rounded bg-gray-200 px-8 py-4 text-left transition-colors hover:bg-fuchsia-200"
                                    >
                                        {blockDefinition.type}
                                    </button>
                                </KeyboardFocusable>
                            }
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
};
