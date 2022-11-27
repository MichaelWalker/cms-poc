import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";

type PageListProps = {
    parentFolderId: string;
};

type PageProps = {
    id: string;
    url: string;
    name: string;
};

const Page: FC<PageProps> = ({ id, name, url }) => {
    return (
        <a href={`/cms/pages/${id}`}>
            <span>{name}</span>
            <span>{url}</span>
        </a>
    );
};

export const PageList: FC<PageListProps> = ({ parentFolderId }) => {
    const pagesQuery = trpc.folders.getPagesInFolder.useQuery({ folderId: parentFolderId });

    return (
        <section className="mb-12">
            <SectionHeader>Pages</SectionHeader>
            <Loadable query={pagesQuery}>
                {(data) => (
                    <ol>
                        {data.map(({ id, name, url }) => (
                            <Page id={id} name={name} url={url} />
                        ))}
                    </ol>
                )}
            </Loadable>
        </section>
    );
};
