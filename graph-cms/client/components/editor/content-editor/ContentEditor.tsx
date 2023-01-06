import { FC, ReactElement, useState } from "react";
import { BlockDetails } from "./block-details/BlockDetails";
import { PageSummary } from "./page-summary/PageSummary";
import { PageDetails } from "./page-details/PageDetails";

export type Breadcrumb = { id: string; name: string };
type ContentEditorProps = {};
type EditorState =
    | { slide: "block-list" }
    | { slide: "block-details"; blockId: string; breadcrumbs: Breadcrumb[] }
    | { slide: "page-details" };

export const ContentEditor: FC<ContentEditorProps> = () => {
    const [state, setState] = useState<EditorState>({ slide: "block-list" });

    function goToBlockList() {
        setState({ slide: "block-list" });
    }

    function goToBlockDetails(blockId: string, breadcrumbs: Breadcrumb[]) {
        setState({ slide: "block-details", blockId, breadcrumbs });
    }

    function goToPageDetails() {
        setState({ slide: "page-details" });
    }

    function getSlide(): ReactElement {
        switch (state.slide) {
            case "page-details":
                return <PageDetails goToBlockList={goToBlockList} />;
            case "block-details":
                return <BlockDetails goToBlockList={goToBlockList} />;
            case "block-list":
                return <PageSummary goToBlockDetails={goToBlockDetails} goToPageDetails={goToPageDetails} />;
        }
    }

    return (
        <div className="col-start-2 col-end-3 row-start-3 row-end-4 w-[40rem] min-w-[44rem] overflow-y-auto px-8 [&>*]:mb-8">
            <div className="overflow-hidden rounded-xl bg-white">{getSlide()}</div>
        </div>
    );
};
