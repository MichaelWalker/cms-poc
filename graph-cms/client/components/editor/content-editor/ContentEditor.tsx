import { FC, ReactElement, useState } from "react";
import { BlockDetails } from "./block-details/BlockDetails";
import { PageSummary } from "./page-summary/PageSummary";
import { PageDetails } from "./page-details/PageDetails";
import { BlockNode, FieldNode } from "graph-cms/shared/domainTypes";
import { CreateBlock } from "./create-block/CreateBlock";

export type Breadcrumb = { id: string; name: string };
type ContentEditorProps = {};
type EditorState =
    | { slide: "page-summary" }
    | { slide: "block-details"; label: string; blockNode: BlockNode; fieldNode: FieldNode | null }
    | { slide: "create-block"; label: string; fieldNode: FieldNode | null }
    | { slide: "page-details" };

export const ContentEditor: FC<ContentEditorProps> = () => {
    const [state, setState] = useState<EditorState>({ slide: "page-summary" });

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

    function getSlide(): ReactElement {
        switch (state.slide) {
            case "page-details":
                return <PageDetails goToBlockList={goToPageSummary} />;
            case "block-details":
                return (
                    <BlockDetails
                        label={state.label}
                        block={state.blockNode}
                        field={state.fieldNode}
                        goToBlockList={goToPageSummary}
                    />
                );
            case "create-block":
                return (
                    <CreateBlock
                        label={state.label}
                        field={state.fieldNode}
                        goToPageSummary={goToPageSummary}
                        goToBlockDetails={goToBlockDetails}
                    />
                );
            case "page-summary":
                return (
                    <PageSummary
                        goToCreateBlock={goToCreateBlock}
                        goToBlockDetails={goToBlockDetails}
                        goToPageDetails={goToPageDetails}
                    />
                );
        }
    }

    return (
        <div className="col-start-2 col-end-3 row-start-3 row-end-4 w-[40rem] min-w-[44rem] overflow-y-auto px-8 [&>*]:mb-8">
            <div className="overflow-hidden rounded-xl bg-white">{getSlide()}</div>
        </div>
    );
};
