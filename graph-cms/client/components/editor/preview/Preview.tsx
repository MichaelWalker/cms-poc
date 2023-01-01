import { createRenderer } from "graph-cms";
import { FC, useMemo, useState } from "react";
import { usePageEditorContext } from "../PageEditorContext";
import { PreviewControls } from "./preview-controls/PreviewControls";
import { PreviewIFrame, ViewportSize } from "./preview-iframe/PreviewIFrame";

type PreviewProps = {};

export const Preview: FC<PreviewProps> = ({}) => {
    const { content, blockDefinitions } = usePageEditorContext();
    const [size, setSize] = useState<ViewportSize>("mobile");

    const BlockRenderer = useMemo(() => {
        return createRenderer(blockDefinitions);
    }, [blockDefinitions]);

    return (
        <>
            <PreviewControls size={size} setSize={setSize} />
            <PreviewIFrame size={size}>
                <BlockRenderer {...content} />
            </PreviewIFrame>
        </>
    );
};
