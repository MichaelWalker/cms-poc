import { FC, ReactNode } from "react";
import { KeyboardFocusable } from "../keyboard-focusable/KeyboardFocusable";

type PrimaryButtonProps = {
    onClick?: () => void;
    children: ReactNode;
    disabled?: boolean;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, onClick, disabled = false }) => {
    return (
        <KeyboardFocusable>
            <button
                type={onClick ? "button" : "submit"}
                disabled={disabled}
                onClick={onClick}
                className="block rounded-xl border-none bg-fuchsia-600 px-8 py-2 text-lg font-medium text-white hover:bg-gradient-to-br hover:from-fuchsia-600 hover:via-fuchsia-500 hover:to-fuchsia-500 disabled:bg-fuchsia-300"
            >
                {children}
            </button>
        </KeyboardFocusable>
    );
};
