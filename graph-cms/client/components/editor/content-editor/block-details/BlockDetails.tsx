import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButton } from "graph-cms/client/components/buttons/LinkButton";
import { BlockNode, FieldNode } from "graph-cms/shared/domainTypes";
import { FC } from "react";

type BlockDetailsProps = {
    label: string;
    block: BlockNode;
    field: FieldNode | null;
    goToBlockList: () => void;
};

export const BlockDetails: FC<BlockDetailsProps> = ({ label, block, field, goToBlockList }) => {
    return (
        <div className="relative bg-gray-gradient p-8">
            <h2 className="text-4xl text-white">{label}</h2>
            <IconButton onClick={goToBlockList} className="absolute right-8 top-8">
                <ArrowLeftIcon width={20} height={20} />
            </IconButton>
        </div>
    );
};
