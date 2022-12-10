import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { Loading } from "../loading/Loading";
import { ActionBar } from "./action-bar/ActionBar";
import { EditorControls } from "./editor-controls/EditorControls";
import { Preview } from "./preview/Preview";

type EditorProps = {
    pageId: string;
};

export const Editor: FC<EditorProps> = ({ pageId }) => {
    const pageQuery = trpc.pages.getById.useQuery({ id: pageId });

    switch (pageQuery.status) {
        case "loading":
            return <Loading />;
        case "error":
            return <div>Oh dear</div>;
        case "success":
            const page = pageQuery.data;
            return (
                <div className="flex h-screen flex-col">
                    <ActionBar page={page} />
                    <div className="flex flex-grow flex-row">
                        <Preview />
                        <EditorControls />
                    </div>
                </div>
            );
    }
};
