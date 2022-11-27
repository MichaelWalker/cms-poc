import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";

type FolderListProps = {
    parentFolderId: string;
};

type FolderProps = {
    id: string;
    name: string;
};

const Folder: FC<FolderProps> = ({ id, name }) => {
    return (
        <a href={`/cms/folders/${id}`}>
            <span>{name}</span>
        </a>
    );
};

export const FolderList: FC<FolderListProps> = ({ parentFolderId }) => {
    const foldersQuery = trpc.folders.getFoldersInFolder.useQuery({ folderId: parentFolderId });

    return (
        <section className="mb-12">
            <SectionHeader>Folders</SectionHeader>
            <Loadable query={foldersQuery}>
                {(data) => (
                    <ol>
                        {data.map((folder) => (
                            <Folder id={folder.id} name={folder.name} />
                        ))}
                    </ol>
                )}
            </Loadable>
        </section>
    );
};
