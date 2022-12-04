import { FC } from "react";
import { AdminLayout } from "../components/admin-layout/AdminLayout";
import { FolderContents } from "../components/folder-contents/FolderContents";

type FolderPageProps = {
    folderId: string;
};

export const FolderPage: FC<FolderPageProps> = ({ folderId }) => {
    return (
        <AdminLayout title="Folder" folderId={folderId}>
            <FolderContents folderId={folderId} />
        </AdminLayout>
    );
};
