import { createBlockNodeRenderer } from "graph-cms/client/BlockRenderer";
import { FC, useMemo, useState } from "react";
import { usePageEditorContext } from "../PageEditorContext";
import { PreviewControls } from "./preview-controls/PreviewControls";
import { PreviewIFrame, ViewportSize } from "./preview-iframe/PreviewIFrame";

type PreviewProps = {};

export const Preview: FC<PreviewProps> = ({}) => {
    const { rootBlock, blockDefinitions } = usePageEditorContext();
    const [size, setSize] = useState<ViewportSize>("mobile");

    const blockNodeRenderer = useMemo(() => {
        return createBlockNodeRenderer(blockDefinitions);
    }, [blockDefinitions]);

    return (
        <>
            <PreviewControls size={size} setSize={setSize} />
            <PreviewIFrame size={size}>{blockNodeRenderer(rootBlock)}</PreviewIFrame>
        </>
    );
};
