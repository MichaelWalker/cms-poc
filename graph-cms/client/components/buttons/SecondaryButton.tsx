import { FC, ReactNode } from "react";
import { KeyboardFocusable } from "../keyboard-focusable/KeyboardFocusable";

type SecondaryButtonProps = {
    children: ReactNode;
};

export const SecondaryButton: FC<SecondaryButtonProps> = ({ children }) => {
    return (
        <KeyboardFocusable>
            <button className="rounded-xl border-2 border-fuchsia-600 px-4 py-2 font-medium text-fuchsia-600 hover:border-orange-500 hover:text-orange-500">
                {children}
            </button>
        </KeyboardFocusable>
    );
};