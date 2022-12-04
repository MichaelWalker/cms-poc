import { FocusRing } from "@react-aria/focus";
import { trpc } from "graph-cms/client/trpc";
import Link from "next/link";
import { FC } from "react";
import { CreateTemplateModal } from "../create-template-modal/CreateTemplateModal";
import { SectionHeader } from "../headers/SectionHeader";
import { Loadable } from "../loadable/Loadable";

type TemplateListProps = {
    folderId: string;
};

type TemplateProps = {
    id: string;
    name: string;
};

const Template: FC<TemplateProps> = ({ id, name }) => {
    return (
        <tr className="border-b border-stone-200 last:border-none">
            <td className="py-4 pl-8">
                <FocusRing focusRingClass="ring-1 ring-black">
                    <Link
                        href={`/cms/pages/${id}`}
                        className="-mx-2 rounded px-2 py-1 font-medium outline-none hover:underline"
                    >
                        {name}
                    </Link>
                </FocusRing>
            </td>
            <td className="py-4 pl-8">Block</td>
            <td className="py-4 pl-8 pr-8">Just Now</td>
        </tr>
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
                            <div className="rounded-xl bg-white">
                                <table className="mb-4 w-full rounded-xl text-left">
                                    <thead className="">
                                        <tr>
                                            <th className="text rounded-tl-xl bg-slate-200 py-4 pl-8 text-sm font-light uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="text bg-slate-200 py-4 pl-8 text-sm font-light uppercase tracking-wider">
                                                Block
                                            </th>
                                            <th className="text rounded-tr-xl bg-slate-200 py-4 pl-8 pr-8 text-sm font-light uppercase tracking-wider">
                                                Last Updated
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(({ id, name }) => (
                                            <Template key={id} id={id} name={name} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                        <CreateTemplateModal folderId={folderId} />
                    </>
                )}
            </Loadable>
        </section>
    );
};
