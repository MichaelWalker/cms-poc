import { FC, ReactNode } from "react";
import { KeyboardFocusable } from "../keyboard-focusable/KeyboardFocusable";

type PrimaryButtonProps = {
    children: ReactNode;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children }) => {
    return (
        <KeyboardFocusable>
            <button
                type="submit"
                className="block rounded-xl border-none bg-fuchsia-600 px-8 py-4 text-lg font-medium text-white hover:bg-gradient-to-br hover:from-fuchsia-600 hover:via-fuchsia-500 hover:to-orange-500"
            >
                {children}
            </button>
        </KeyboardFocusable>
    );
};
