import Link from "next/link";
import { FC } from "react";
import { FolderContents } from "../components/folder-contents/FolderContents";

type FolderPageProps = {
    folderId: string;
};

export const FolderPage: FC<FolderPageProps> = ({ folderId }) => {
    return (
        <div>
            <FolderContents folderId={folderId} />
        </div>
    );
};
