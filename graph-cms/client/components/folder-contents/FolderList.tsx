import { trpc } from "graph-cms/client/trpc";
import Link from "next/link";
import { FC } from "react";
import { CreateFolderModal } from "../create-folder-modal/CreateFolderModal";
import { KeyboardFocusable } from "../keyboard-focusable/KeyboardFocusable";
import { Loadable } from "../loadable/Loadable";
import { SectionHeader } from "../typography/SectionHeader";

type FolderListProps = {
    parentFolderId: string;
};

type FolderProps = {
    id: string;
    name: string;
};

const Folder: FC<FolderProps> = ({ id, name }) => {
    return (
        <KeyboardFocusable>
            <Link href={`/cms/folders/${id}`} className="block rounded-xl border-none bg-white px-8 py-4 shadow">
                <span>{name}</span>
            </Link>
        </KeyboardFocusable>
    );
};

export const FolderList: FC<FolderListProps> = ({ parentFolderId }) => {
    const foldersQuery = trpc.folders.findInFolder.useQuery({ folderId: parentFolderId });

    return (
        <section className="mb-12">
            <SectionHeader>Folders</SectionHeader>
            <Loadable query={foldersQuery}>
                {(data) => (
                    <>
                        {data.length > 0 ? (
                            <ol className="spa mb-4 grid grid-cols-4 gap-4">
                                {data.map((folder) => (
                                    <li key={folder.id}>
                                        <Folder id={folder.id} name={folder.name} />
                                    </li>
                                ))}
                            </ol>
                        ) : null}
                        <CreateFolderModal parentFolderId={parentFolderId} />
                    </>
                )}
            </Loadable>
        </section>
    );
};
