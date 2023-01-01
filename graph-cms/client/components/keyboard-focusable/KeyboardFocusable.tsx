import { FocusRing } from "@react-aria/focus";
import { FC, ReactElement } from "react";

type KeyboardFocusableProps = {
    ringColor?: "fuchsia" | "white";
    ringOffsetColor?: "gray" | "white";
    children: ReactElement;
};

export const KeyboardFocusable: FC<KeyboardFocusableProps> = ({
    ringColor = "fuchsia",
    ringOffsetColor = "white",
    children,
}) => {
    function getRingColorClass() {
        switch (ringColor) {
            case "fuchsia":
                return "ring-fuchsia-600";
            case "white":
                return "ring-white";
        }
    }

    function getRingOffsetColorClass() {
        switch (ringOffsetColor) {
            case "gray":
                return "ring-offset-gray-800";
            case "white":
                return "ring-offset-white";
        }
    }

    return (
        <FocusRing
            focusRingClass={`outline-none ring-1 ring-offset-4 ${getRingColorClass()} ${getRingOffsetColorClass()}`}
        >
            {children}
        </FocusRing>
    );
};
