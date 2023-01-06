import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { CreateTemplateModal } from "../create-template-modal/CreateTemplateModal";
import { SectionHeader } from "../typography/SectionHeader";
import { Loadable } from "../loadable/Loadable";
import { Table } from "../table/Table";
import { TableCell } from "../table/TableCell";
import { CmsLink } from "../typography/CmsLink";

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
                <CmsLink href={`/cms/pages/${id}`}>{name}</CmsLink>
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
