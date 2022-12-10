import { ReactNode } from "react";
import { Item } from "@radix-ui/react-toggle-group";
import { FocusRing } from "@react-aria/focus";
import { KeyboardFocusable } from "../../keyboard-focusable/KeyboardFocusable";

export type ToggleItemProps<T extends string> = {
    value: T;
    icon: ReactNode;
    label: string;
};

export function ToggleItem<T extends string>({ value, icon, label }: ToggleItemProps<T>) {
    return (
        <KeyboardFocusable>
            <Item
                value={value}
                className="mx-4 flex flex-row items-center rounded-2xl bg-white px-4 py-1 transition-colors hover:bg-fuchsia-200 data-[state=on]:bg-fuchsia-600 data-[state=on]:text-white"
            >
                <span className="mr-2">{icon}</span>
                {label}
            </Item>
        </KeyboardFocusable>
    );
}
