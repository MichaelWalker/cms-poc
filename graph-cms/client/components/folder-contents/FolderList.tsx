import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";

type FolderListProps = {
    parentFolderId: string;
};

export const FolderList: FC<FolderListProps> = ({ parentFolderId }) => {
    const foldersQuery = trpc.folders.getFoldersInFolder.useQuery({ folderId: parentFolderId });

    return (
        <section className="mb-12">
            <SectionHeader>Folders</SectionHeader>
            <Loadable />
        </section>
    );
};
