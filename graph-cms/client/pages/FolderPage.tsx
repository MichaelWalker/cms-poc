import { FC } from "react";
import { AdminLayout } from "../components/admin-layout/AdminLayout";
import { FolderContents } from "../components/folder-contents/FolderContents";
import { FolderPageHeader } from "../components/folder-page-header/FolderPageHeader";

type FolderPageProps = {
    folderId: string;
};

export const FolderPage: FC<FolderPageProps> = ({ folderId }) => {
    return (
        <AdminLayout title={<FolderPageHeader id={folderId} />}>
            <FolderContents folderId={folderId} />
        </AdminLayout>
    );
};
