import { FocusRing } from "@react-aria/focus";
import { trpc } from "graph-cms/client/trpc";
import { HOME_FOLDER_ID } from "graph-cms/shared/constants";
import Link from "next/link";
import { FC } from "react";
import { Loading } from "../loading/Loading";
import { ChevronRightIcon } from "@radix-ui/react-icons";

type BreadcrumbsProps = {
    folderId: string;
};

function getPath(id: string): string {
    if (id === HOME_FOLDER_ID) {
        return "/cms";
    }

    return `/cms/folders/${id}`;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ folderId }) => {
    const query = trpc.folders.getBreadcrumbs.useQuery({ folderId });

    switch (query.status) {
        case "error":
            return <div>Oh No!</div>;
        case "loading":
            return <Loading />;
        case "success":
            return (
                <div>
                    {query.data.map(({ id, name }, index) => (
                        <span key={id}>
                            <FocusRing focusRingClass="ring-1 ring-white">
                                <Link
                                    href={getPath(id)}
                                    className="-mx-2 rounded px-2 py-1 font-medium text-white outline-none hover:underline"
                                >
                                    {name}
                                </Link>
                            </FocusRing>
                            {index !== query.data.length - 1 ? (
                                <ChevronRightIcon className="mx-2 inline-block stroke-white" />
                            ) : null}
                        </span>
                    ))}
                </div>
            );
    }
};
