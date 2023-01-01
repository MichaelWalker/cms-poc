import { useRouter } from "next/router";
import { FC } from "react";
import { Loading } from "./components/loading/Loading";
import { Main } from "./components/main/Main";
import { PageEditorPage } from "./pages/PageEditorPage";
import { FolderPage } from "./pages/FolderPage";
import { HomePage } from "./pages/HomePage";
import { BlockDefinition } from "graph-cms";

type PagesProps = {
    blockDefinitions: BlockDefinition<any>[];
};

export const Pages: FC<PagesProps> = ({ blockDefinitions }) => {
    const { query, isReady } = useRouter();
    const pagePath = query.page;

    if (!isReady) {
        return (
            <Main className="h-screen">
                <Loading />
            </Main>
        );
    }

    if (pagePath?.length === 2 && pagePath[0] === "folders") {
        return <FolderPage folderId={pagePath[1] as string} />;
    }

    if (pagePath?.length === 2 && pagePath[0] === "pages") {
        return <PageEditorPage pageId={pagePath[1] as string} blockDefinitions={blockDefinitions} />;
    }

    return <HomePage />;
};
