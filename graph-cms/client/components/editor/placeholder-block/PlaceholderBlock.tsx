import { block } from "graph-cms";
import { BlockNode } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { z } from "zod";

const placeholderBlockSchema = z.object({});
type PlaceholderBlockProps = z.infer<typeof placeholderBlockSchema>;

const PlaceholderBlock: FC<PlaceholderBlockProps> = () => {
    return (
        <div className="flex h-full items-center justify-center rounded-3xl bg-gradient-to-br from-gray-600 to-gray-800 outline-dashed outline-1 outline-offset-[-8px] outline-white">
            <span className="text-5xl text-gray-400">Placeholder</span>
        </div>
    );
};

export const placeholderBlockDefinition = block({
    type: "placeholder",
    schema: placeholderBlockSchema,
    component: PlaceholderBlock,
    fields: {},
});

export function placeholderBlockNode(): BlockNode {
    return {
        id: "placeholder",
        type: "placeholder",
        fieldRelations: [],
    };
}
