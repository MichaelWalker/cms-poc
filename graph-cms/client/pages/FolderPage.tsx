import Link from "next/link";
import { FC } from "react";

type FolderPageProps = {
    folderId: string;
};

export const FolderPage: FC<FolderPageProps> = ({ folderId }) => {
    return (
        <div>
            Folder Page: {folderId}
            <Link href="/cms">Home</Link>
            <Link href="/cms/pages/foo">Page</Link>
        </div>
    );
};
