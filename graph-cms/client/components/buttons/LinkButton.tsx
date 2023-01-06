import { FC, ReactNode } from "react";
import { KeyboardFocusable } from "../keyboard-focusable/KeyboardFocusable";

type LinkButtonProps = {
    onClick: () => void;
    children: ReactNode;
    className?: string;
};

export const IconButton: FC<LinkButtonProps> = ({ onClick, children, className }) => {
    return (
        <KeyboardFocusable ringColor="white" ringOffsetColor="gray">
            <button
                onClick={onClick}
                className={`rounded-full bg-white p-2 transition hover:bg-fuchsia-200 ${className}`}
            >
                {children}
            </button>
        </KeyboardFocusable>
    );
};
