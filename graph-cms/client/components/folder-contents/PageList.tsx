import { trpc } from "graph-cms/client/trpc";
import Link from "next/link";
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
        <Link href={`/cms/pages/${id}`}>
            <span>{name}</span>
            <span>{url}</span>
        </Link>
    );
};

export const PageList: FC<PageListProps> = ({ parentFolderId }) => {
    const pagesQuery = trpc.pages.findInFolder.useQuery({ folderId: parentFolderId });

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
