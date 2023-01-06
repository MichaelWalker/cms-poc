import { KeyboardFocusable } from "graph-cms/client/components/keyboard-focusable/KeyboardFocusable";
import { BlockNode } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { Breadcrumb } from "../ContentEditor";

type BlockListItemProps = {
    label: string;
    block: BlockNode | null;
    goToBlockDetails: (blockId: string, breadcrumbs: Breadcrumb[]) => void;
};

export const BlockListItem: FC<BlockListItemProps> = ({ label, block, goToBlockDetails }) => {
    return (
        <KeyboardFocusable>
            <button className="w-full rounded bg-gray-200 px-8 py-2 text-left transition-colors hover:bg-fuchsia-200">
                <span className="block text-xs font-medium tracking-wider">{label}</span>
                <span>Empty</span>
            </button>
        </KeyboardFocusable>
    );
};
