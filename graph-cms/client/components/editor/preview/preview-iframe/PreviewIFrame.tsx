import { FC, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

export type ViewportSize = "mobile" | "tablet" | "desktop" | "fill";

type PreviewIFrameProps = {
    children: ReactNode;
    size: ViewportSize;
};

function getViewportStyles(viewportSize: ViewportSize): string {
    switch (viewportSize) {
        case "mobile":
            return "w-[375px] h-[812px] shadow-xl shadow-gray-700";
        case "tablet":
            return "w-[768px] h-[1024px] shadow-xl shadow-gray-700";
        case "desktop":
            return "w-[1920px] h-[1080px]";
        case "fill":
            return "w-full h-full";
    }
}

export const PreviewIFrame: FC<PreviewIFrameProps> = ({ children, size }) => {
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
        <div className="col-start-1 col-end-2 row-start-3 row-end-4 h-full overflow-auto pl-8 pb-8">
            <iframe
                ref={setRef}
                className={`scale m-auto rounded-3xl bg-white transition-all ${getViewportStyles(size)}`}
            >
                {frameDocument ? createPortal(getParentHead(), frameDocument.documentElement) : null}
                {frameDocument ? createPortal(children, frameDocument.body) : null}
            </iframe>
        </div>
    );
};
