import { FocusRing } from "@react-aria/focus";
import { trpc } from "graph-cms/client/trpc";
import Link from "next/link";
import { FC } from "react";
import { CreateTemplateModal } from "../create-template-modal/CreateTemplateModal";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";
import { Table } from "../table/Table";
import { TableCell } from "../table/TableCell";

type TemplateListProps = {
    folderId: string;
};

type TemplateProps = {
    id: string;
    name: string;
};

const Template: FC<TemplateProps> = ({ id, name }) => {
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
            <TableCell>Block</TableCell>
            <TableCell>Just Now</TableCell>
        </>
    );
};

export const TemplateList: FC<TemplateListProps> = ({ folderId }) => {
    const templatesQuery = trpc.templates.findInFolder.useQuery({ folderId });

    return (
        <section className="mb-12">
            <SectionHeader>Templates</SectionHeader>
            <Loadable query={templatesQuery}>
                {(data) => (
                    <>
                        {data.length > 0 ? (
                            <Table
                                headers={["Name", "Block", "Last Updated"]}
                                items={data}
                                renderItem={(item) => <Template {...item} />}
                            />
                        ) : null}
                        <CreateTemplateModal folderId={folderId} />
                    </>
                )}
            </Loadable>
        </section>
    );
};
