import { BlockDefinition } from "graph-cms";
import { convertFromNode, getBlockDefinition } from "graph-cms/shared/block-utils";
import { Block, BlockNode } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { PlaceholderBlock } from "./components/editor/placeholder-block/PlaceholderBlock";

type BlockRendererProps = {
    block: Block;
    blockDefinitions: BlockDefinition<any>[];
};

const BlockRenderer: FC<BlockRendererProps> = ({ blockDefinitions, block }) => {
    if (block.type === "placeholder") {
        return <PlaceholderBlock />;
    }

    const definition = getBlockDefinition(blockDefinitions, block.type);
    return definition.component(block.data);
};

export function createBlockRenderer(blockDefinitions: BlockDefinition<any>[]): FC<any> {
    return (block: Block) => <BlockRenderer blockDefinitions={blockDefinitions} block={block} />;
}

export function createBlockNodeRenderer(blockDefinitions: BlockDefinition<any>[]): FC<any> {
    return (blockNode: BlockNode | null) => {
        const block = convertFromNode(blockDefinitions, blockNode);
        return <BlockRenderer blockDefinitions={blockDefinitions} block={block} />;
    };
}
