import { AllSidesIcon, DesktopIcon, LaptopIcon, MobileIcon } from "@radix-ui/react-icons";
import { ToggleGroup } from "graph-cms/client/components/forms/inputs/ToggleGroup";
import { ToggleItemProps } from "graph-cms/client/components/forms/inputs/ToggleItem";
import { FC, useState } from "react";

type PreviewControlsProps = {};
type ViewportSize = "mobile" | "tablet" | "desktop" | "fill";

const viewportOptions: ToggleItemProps<ViewportSize>[] = [
    { value: "mobile", label: "mobile", icon: <MobileIcon /> },
    { value: "tablet", label: "tablet", icon: <LaptopIcon /> },
    { value: "desktop", label: "desktop", icon: <DesktopIcon /> },
    { value: "fill", label: "fill space", icon: <AllSidesIcon /> },
];

export const PreviewControls: FC<PreviewControlsProps> = ({}) => {
    const [viewportSize, setViewportSize] = useState<ViewportSize>("mobile");

    return (
        <div className="py-4">
            <form className="flex flex-row justify-center">
                <ToggleGroup value={viewportSize} onValueChange={setViewportSize} items={viewportOptions} />
            </form>
        </div>
    );
};
