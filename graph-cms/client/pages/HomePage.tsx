import { HOME_FOLDER_ID } from "graph-cms/shared/constants";
import { FC } from "react";
import { AdminLayout } from "../components/admin-layout/AdminLayout";
import { FolderContents } from "../components/folder-contents/FolderContents";
import { PageTitle } from "../components/typography/PageTitle";

export const HomePage: FC = () => {
    return (
        <AdminLayout title={<PageTitle>Dashboard</PageTitle>}>
            <FolderContents folderId={HOME_FOLDER_ID} />
        </AdminLayout>
    );
};
