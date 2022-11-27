import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";

type TemplateListProps = {
    parentFolderId: string;
};

export const TemplateList: FC<TemplateListProps> = ({ parentFolderId }) => {
    const foldersQuery = trpc.folders.getFoldersInFolder.useQuery({ folderId: parentFolderId });

    return (
        <section className="mb-12">
            <SectionHeader>Templates</SectionHeader>
            <Loadable />
        </section>
    );
};
