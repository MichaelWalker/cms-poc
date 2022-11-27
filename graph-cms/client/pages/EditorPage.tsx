import { FC } from "react";

type EditorPageProps = {
    pageId: string;
};

export const EditorPage: FC<EditorPageProps> = ({ pageId }) => {
    return <div>Editor Page: {pageId}</div>;
};
