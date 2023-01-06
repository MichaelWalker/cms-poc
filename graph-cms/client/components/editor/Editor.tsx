import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { Loading } from "../loading/Loading";
import { ActionBar } from "./action-bar/ActionBar";
import { Preview } from "./preview/Preview";
import styles from "./editor.module.css";
import { PageEditorContextProvider } from "./PageEditorContext";
import { BlockDefinition } from "graph-cms";
import { ContentEditor } from "./content-editor/ContentEditor";

type EditorProps = {
    pageId: string;
    blockDefinitions: BlockDefinition<any>[];
};

export const Editor: FC<EditorProps> = ({ pageId, blockDefinitions }) => {
    const pageQuery = trpc.pages.getByIdWithParentFolder.useQuery({ id: pageId });
    const contentQuery = trpc.content.getRootBlockByPageId.useQuery({ pageId });

    if (pageQuery.status === "error" || contentQuery.status === "error") {
        return <div>Oh dear</div>;
    }

    if (pageQuery.status === "loading" || contentQuery.status === "loading") {
        return <Loading />;
    }

    return (
        <PageEditorContextProvider
            page={pageQuery.data}
            content={contentQuery.data}
            blockDefinitions={blockDefinitions}
        >
            <div className={`grid h-screen w-screen overflow-hidden ${styles.gridTemplate}`}>
                <ActionBar />
                <Preview />
                <ContentEditor />
            </div>
        </PageEditorContextProvider>
    );
};
