import { FC } from "react";
import { Editor } from "../components/editor/Editor";
import { Main } from "../components/main/Main";

type PageEditorPageProps = {
    pageId: string;
};

export const PageEditorPage: FC<PageEditorPageProps> = ({ pageId }) => {
    return (
        <Main className="min-h-screen bg-stone-200">
            <Editor pageId={pageId} />
        </Main>
    );
};
