import { FocusRing } from "@react-aria/focus";
import { trpc } from "graph-cms/client/trpc";
import { HOME_FOLDER_ID } from "graph-cms/shared/constants";
import Link from "next/link";
import { FC } from "react";
import { Loading } from "../loading/Loading";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { CmsLink } from "../typography/CmsLink";

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
                            <CmsLink href={getPath(id)} color="white">
                                {name}
                            </CmsLink>
                            {index !== query.data.length - 1 ? (
                                <ChevronRightIcon className="mx-2 inline-block stroke-white" />
                            ) : null}
                        </span>
                    ))}
                </div>
            );
    }
};
