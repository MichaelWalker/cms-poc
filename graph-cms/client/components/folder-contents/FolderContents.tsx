import { FC } from "react";
import { FolderList } from "./FolderList";
import { PageList } from "./PageList";
import { TemplateList } from "./TemplateList";

type FolderContentsProps = {
    folderId: string;
};

export const FolderContents: FC<FolderContentsProps> = ({ folderId }) => {
    return (
        <>
            <FolderList parentFolderId={folderId} />
            <PageList parentFolderId={folderId} />
            <TemplateList folderId={folderId} />
        </>
    );
};
