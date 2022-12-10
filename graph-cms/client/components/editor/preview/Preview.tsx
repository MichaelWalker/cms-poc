import { FC, useState } from "react";
import { PreviewControls } from "./preview-controls/PreviewControls";
import { PreviewIFrame, ViewportSize } from "./preview-iframe/PreviewIFrame";

type PreviewProps = {};

export const Preview: FC<PreviewProps> = ({}) => {
    const [viewportSize, setViewportSize] = useState<ViewportSize>("mobile");

    return (
        <>
            <PreviewControls viewportSize={viewportSize} setViewportSize={setViewportSize} />
            <PreviewIFrame viewportSize={viewportSize}>
                <div>Hi there</div>
            </PreviewIFrame>
        </>
    );
};
