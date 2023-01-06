import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { CreatePageModal } from "../create-page-modal/CreatePageModal";
import { SectionHeader } from "../typography/SectionHeader";
import { Loadable } from "../loadable/Loadable";
import { Table } from "../table/Table";
import { TableCell } from "../table/TableCell";
import { CmsLink } from "../typography/CmsLink";

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
                <CmsLink href={`/cms/pages/${id}`}>{name}</CmsLink>
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
