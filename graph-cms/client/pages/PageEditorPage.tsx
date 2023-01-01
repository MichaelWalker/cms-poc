import { BlockDefinition } from "graph-cms";
import { FC } from "react";
import { Editor } from "../components/editor/Editor";
import { Main } from "../components/main/Main";

type PageEditorPageProps = {
    pageId: string;
    blockDefinitions: BlockDefinition<any>[];
};

export const PageEditorPage: FC<PageEditorPageProps> = ({ pageId, blockDefinitions }) => {
    return (
        <Main className="min-h-screen bg-stone-200">
            <Editor pageId={pageId} blockDefinitions={blockDefinitions} />
        </Main>
    );
};
