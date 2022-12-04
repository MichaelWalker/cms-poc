import { FocusRing } from "@react-aria/focus";
import { trpc } from "graph-cms/client/trpc";
import Link from "next/link";
import { FC } from "react";
import { CreatePageModal } from "../create-page-modal/CreatePageModal";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";
import { Table } from "../table/Table";
import { TableCell } from "../table/TableCell";

type PageListProps = {
    folderId: string;
};

type PageProps = {
    id: string;
    url: string;
    name: string;
};

const Page: FC<PageProps> = ({ id, name, url }) => {
    return (
        <>
            <TableCell>
                <FocusRing focusRingClass="ring-1 ring-black">
                    <Link
                        href={`/cms/pages/${id}`}
                        className="-mx-2 rounded px-2 py-1 font-medium outline-none hover:underline"
                    >
                        {name}
                    </Link>
                </FocusRing>
            </TableCell>
            <TableCell>{url}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>English</TableCell>
            <TableCell>Just Now</TableCell>
        </>
    );
};

export const PageList: FC<PageListProps> = ({ folderId }) => {
    const pagesQuery = trpc.pages.findInFolder.useQuery({ folderId });

    return (
        <section className="mb-12">
            <SectionHeader>Pages</SectionHeader>
            <Loadable query={pagesQuery}>
                {(data) => (
                    <>
                        {data.length > 0 ? (
                            <Table
                                headers={["Name", "Url", "Template", "Languages", "last Updated"]}
                                items={data}
                                renderItem={(item) => <Page {...item} />}
                            />
                        ) : null}
                        <CreatePageModal folderId={folderId} />
                    </>
                )}
            </Loadable>
        </section>
    );
};
