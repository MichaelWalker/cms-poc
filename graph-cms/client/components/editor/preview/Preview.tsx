import { FC } from "react";
import { PreviewControls } from "./preview-controls/PreviewControls";
import { PreviewIFrame } from "./preview-iframe/PreviewIFrame";

type PreviewProps = {};

export const Preview: FC<PreviewProps> = ({}) => {
    return (
        <section className="flex-grow ">
            <PreviewControls />
            <PreviewIFrame />
        </section>
    );
};
