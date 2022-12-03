import { FocusRing } from "@react-aria/focus";
import { FC, ReactElement } from "react";

type KeyboardFocusableProps = {
    children: ReactElement;
};

export const KeyboardFocusable: FC<KeyboardFocusableProps> = ({ children }) => {
    return (
        <FocusRing focusRingClass="outline-none ring-1 ring-fuchsia-600 ring-offset-4 ring-offset-slate-100">
            {children}
        </FocusRing>
    );
};
