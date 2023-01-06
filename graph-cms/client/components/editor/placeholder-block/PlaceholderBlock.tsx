import { BlockNode } from "graph-cms/shared/domainTypes";
import { FC } from "react";

export const PlaceholderBlock: FC = () => {
    return (
        <div className="flex h-full items-center justify-center rounded-3xl bg-gray-gradient outline-dashed outline-1 outline-offset-[-8px] outline-white">
            <span className="p-8 text-5xl text-gray-400">Placeholder</span>
        </div>
    );
};

export function placeholderBlockNode(): BlockNode {
    return {
        id: "placeholder",
        type: "placeholder",
        fieldRelations: [],
    };
}
