import { trpc } from "graph-cms/client/trpc";
import Link from "next/link";
import { FC } from "react";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";

type TemplateListProps = {
    parentFolderId: string;
};

type TemplateProps = {
    id: string;
    name: string;
};

const Template: FC<TemplateProps> = ({ id, name }) => {
    return (
        <Link href={`/cms/templates/${id}`}>
            <span>{name}</span>
        </Link>
    );
};

export const TemplateList: FC<TemplateListProps> = ({ parentFolderId }) => {
    const templatesQuery = trpc.templates.findInFolder.useQuery({ folderId: parentFolderId });

    return (
        <section className="mb-12">
            <SectionHeader>Templates</SectionHeader>
            <Loadable query={templatesQuery}>
                {(data) => (
                    <ol>
                        {data.map(({ id, name }) => (
                            <Template id={id} name={name} />
                        ))}
                    </ol>
                )}
            </Loadable>
        </section>
    );
};
