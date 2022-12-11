import { FC, useState } from "react";
import { PreviewControls } from "./preview-controls/PreviewControls";
import { PreviewIFrame, ViewportSize } from "./preview-iframe/PreviewIFrame";

type PreviewProps = {};

export const Preview: FC<PreviewProps> = ({}) => {
    const [size, setSize] = useState<ViewportSize>("mobile");

    return (
        <>
            <PreviewControls size={size} setSize={setSize} />
            <PreviewIFrame size={size}>
                <div>Hi there</div>
            </PreviewIFrame>
        </>
    );
};
