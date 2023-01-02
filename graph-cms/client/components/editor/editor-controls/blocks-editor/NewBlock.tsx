import { SecondaryButton } from "graph-cms/client/components/buttons/SecondaryButton";
import { KeyboardFocusable } from "graph-cms/client/components/keyboard-focusable/KeyboardFocusable";
import { FC } from "react";

type NewBlockProps = {
    label: string;
};

export const NewBlock: FC<NewBlockProps> = ({ label }) => {
    return (
        <SecondaryButton>
            <div className="text-left">
                <div className="text-xs font-medium tracking-wider text-black">{label}</div>
                <div>Add new block +</div>
            </div>
        </SecondaryButton>
    );
};
