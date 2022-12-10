import { Root } from "@radix-ui/react-toggle-group";
import { ToggleItem, ToggleItemProps } from "./ToggleItem";

type ToggleGroupProps<T extends string> = {
    value: T;
    onValueChange: (value: T) => void;
    items: ToggleItemProps<T>[];
};

export function ToggleGroup<T extends string>({ value, onValueChange, items }: ToggleGroupProps<T>) {
    function update(value: string) {
        // ToggleGroup assumes the type is a string,
        // so manually narrow this to a viewport mode.
        onValueChange(value as T);
    }

    return (
        <Root type="single" value={value} onValueChange={update} orientation="horizontal" className="flex flex-row">
            {items.map((item) => (
                <ToggleItem key={item.value} {...item} />
            ))}
        </Root>
    );
}
