import { useRouter } from "next/router";
import { FC } from "react";
import { Loading } from "./components/loading/Loading";
import { EditorPage } from "./pages/EditorPage";
import { FolderPage } from "./pages/FolderPage";
import { HomePage } from "./pages/HomePage";

export const Pages: FC = () => {
    const { query, isReady } = useRouter();
    const pagePath = query.page;

    if (!isReady) {
        return <Loading />;
    }

    if (pagePath?.length === 2 && pagePath[0] === "folders") {
        return <FolderPage folderId={pagePath[1] as string} />;
    }

    if (pagePath?.length === 2 && pagePath[0] === "pages") {
        return <EditorPage pageId={pagePath[1] as string} />;
    }

    return <HomePage />;
};
