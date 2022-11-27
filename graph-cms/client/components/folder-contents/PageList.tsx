import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";

type PageListProps = {
    parentFolderId: string;
};

export const PageList: FC<PageListProps> = ({ parentFolderId }) => {
    const foldersQuery = trpc.folders.getFoldersInFolder.useQuery({ folderId: parentFolderId });

    return (
        <section className="mb-12">
            <SectionHeader>Pages</SectionHeader>
            <Loadable />
        </section>
    );
};
