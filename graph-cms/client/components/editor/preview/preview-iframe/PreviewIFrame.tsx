import { FC, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

export type ViewportSize = "mobile" | "tablet" | "desktop" | "fill";

type PreviewIFrameProps = {
    children: ReactNode;
    viewportSize: ViewportSize;
};

function getViewportStyles(viewportSize: ViewportSize): string {
    switch (viewportSize) {
        case "mobile":
            return "w-[375px] h-[812px]";
        case "tablet":
            return "w-[768px] h-[1024px]";
        case "desktop":
            return "w-[1920px] h-[1080px]";
        case "fill":
            return "w-full h-full";
    }
}

export const PreviewIFrame: FC<PreviewIFrameProps> = ({ children, viewportSize }) => {
    const [ref, setRef] = useState<HTMLIFrameElement | null>(null);
    const frameDocument = ref?.contentWindow?.document;

    function getParentHead(): ReactNode {
        if (document) {
            // eslint-disable-next-line @next/next/no-head-element
            return <head dangerouslySetInnerHTML={{ __html: document.head.innerHTML }} />;
        }
        return null;
    }

    return (
        <div className="col-start-1 col-end-2 row-start-3 row-end-4 overflow-hidden">
            <div className="flex h-full flex-col items-center justify-center pl-8 pb-8">
                <iframe
                    ref={setRef}
                    className={`rounded-3xl bg-white transition-all ${getViewportStyles(viewportSize)}`}
                >
                    {frameDocument ? createPortal(getParentHead(), frameDocument.documentElement) : null}
                    {frameDocument ? createPortal(children, frameDocument.body) : null}
                </iframe>
            </div>
        </div>
    );
};
