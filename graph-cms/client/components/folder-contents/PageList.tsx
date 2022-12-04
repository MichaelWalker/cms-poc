import { FocusRing } from "@react-aria/focus";
import { trpc } from "graph-cms/client/trpc";
import Link from "next/link";
import { FC } from "react";
import { CreatePageModal } from "../create-page-modal/CreatePageModal";
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
            <td className="py-4 pl-8">{url}</td>
            <td className="py-4 pl-8">-</td>
            <td className="py-4 pl-8">English</td>
            <td className="py-4 pl-8 pr-8">Just Now</td>
        </tr>
    );
};

export const PageList: FC<PageListProps> = ({ parentFolderId }) => {
    const pagesQuery = trpc.pages.findInFolder.useQuery({ folderId: parentFolderId });

    return (
        <section className="mb-12">
            <SectionHeader>Pages</SectionHeader>
            <Loadable query={pagesQuery}>
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
                                                Url
                                            </th>
                                            <th className="text bg-slate-200 py-4 pl-8 text-sm font-light uppercase tracking-wider">
                                                Template
                                            </th>
                                            <th className="text bg-slate-200 py-4 pl-8 text-sm font-light uppercase tracking-wider">
                                                Languages
                                            </th>
                                            <th className="text rounded-tr-xl bg-slate-200 py-4 pl-8 pr-8 text-sm font-light uppercase tracking-wider">
                                                Last Updated
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(({ id, name, url }) => (
                                            <Page key={id} id={id} name={name} url={url} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                        <CreatePageModal parentFolderId={parentFolderId} />
                    </>
                )}
            </Loadable>
        </section>
    );
};
