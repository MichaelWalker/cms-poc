import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButton } from "graph-cms/client/components/buttons/LinkButton";
import { BlockNode } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { useContentEditorContext } from "../ContentEditor";
import { FieldEditor } from "./field-editor/FieldEditor";

type BlockDetailsProps = {
    label: string;
    block: BlockNode;
};

export const BlockDetails: FC<BlockDetailsProps> = ({ label, block }) => {
    const { goToPageSummary } = useContentEditorContext();
    return (
        <>
            <div className="relative bg-gray-gradient p-8">
                <h2 className="text-4xl text-white">{label}</h2>
                <IconButton onClick={goToPageSummary} className="absolute right-8 top-8">
                    <ArrowLeftIcon width={20} height={20} />
                </IconButton>
            </div>
            <div className="p-8">
                <h3 className="mb-4 text-2xl">Fields</h3>
                {block.fieldRelations.map((fieldRelation) => (
                    <FieldEditor key={fieldRelation.key} fieldRelation={fieldRelation} block={block} />
                ))}
            </div>
        </>
    );
};
