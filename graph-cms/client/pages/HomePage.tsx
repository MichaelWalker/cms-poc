import { HOME_FOLDER_ID } from "graph-cms/shared/constants";
import { FC } from "react";
import { AdminLayout } from "../components/admin-layout/AdminLayout";
import { FolderContents } from "../components/folder-contents/FolderContents";

export const HomePage: FC = () => {
    return (
        <AdminLayout title="Dashboard">
            <FolderContents folderId={HOME_FOLDER_ID} />
        </AdminLayout>
    );
};
