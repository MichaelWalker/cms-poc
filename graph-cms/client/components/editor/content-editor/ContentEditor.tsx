import { createContext, FC, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { BlockDetails } from "./block-details/BlockDetails";
import { PageSummary } from "./page-summary/PageSummary";
import { PageDetails } from "./page-details/PageDetails";
import { BlockNode, FieldNode } from "graph-cms/shared/domainTypes";
import { CreateBlock } from "./create-block/CreateBlock";
import autoAnimate from "@formkit/auto-animate";

export type Breadcrumb = { id: string; name: string };
type ContentEditorProps = {};
type EditorState =
    | { slide: "page-summary" }
    | { slide: "block-details"; label: string; blockNode: BlockNode; fieldNode: FieldNode | null }
    | { slide: "create-block"; label: string; fieldNode: FieldNode | null }
    | { slide: "page-details" };

type ContentEditorContext = {
    editorState: EditorState;
    goToPageSummary: () => void;
    goToBlockDetails: (label: string, blockNode: BlockNode, fieldNode: FieldNode | null) => void;
    goToPageDetails: () => void;
    goToCreateBlock: (label: string, fieldNode: FieldNode | null) => void;
};

const contentEditorContext = createContext<ContentEditorContext>(undefined as never);

export const ContentEditor: FC<ContentEditorProps> = () => {
    const [state, setState] = useState<EditorState>({ slide: "page-summary" });
    const animationParent = useRef<HTMLDivElement>(null);

    function goToPageSummary() {
        setState({ slide: "page-summary" });
    }

    function goToBlockDetails(label: string, blockNode: BlockNode, fieldNode: FieldNode | null) {
        setState({ slide: "block-details", label, blockNode, fieldNode });
    }

    function goToPageDetails() {
        setState({ slide: "page-details" });
    }

    function goToCreateBlock(label: string, fieldNode: FieldNode | null) {
        setState({ slide: "create-block", label, fieldNode });
    }

    useEffect(() => {
        animationParent.current && autoAnimate(animationParent.current);
    }, [animationParent]);

    function getSlide(): ReactElement {
        switch (state.slide) {
            case "page-details":
                return <PageDetails />;
            case "block-details":
                return <BlockDetails label={state.label} block={state.blockNode} field={state.fieldNode} />;
            case "create-block":
                return <CreateBlock label={state.label} field={state.fieldNode} />;
            case "page-summary":
                return <PageSummary />;
        }
    }

    return (
        <div className="col-start-2 col-end-3 row-start-3 row-end-4 w-[40rem] min-w-[44rem] overflow-y-auto px-8 [&>*]:mb-8">
            <contentEditorContext.Provider
                value={{
                    editorState: state,
                    goToPageSummary,
                    goToBlockDetails,
                    goToPageDetails,
                    goToCreateBlock,
                }}
            >
                <div ref={animationParent} className="overflow-hidden rounded-xl bg-white">
                    {getSlide()}
                </div>
            </contentEditorContext.Provider>
        </div>
    );
};

export function useContentEditorContext() {
    return useContext(contentEditorContext);
}
