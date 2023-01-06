import { trpc } from "graph-cms/client/trpc";
import { FC } from "react";
import { Breadcrumbs } from "../breadcrumbs/Breadcrumbs";
import { PageTitle } from "../typography/PageTitle";
import { Loading } from "../loading/Loading";

type FolderPageHeaderProps = {
    id: string;
};

export const FolderPageHeader: FC<FolderPageHeaderProps> = ({ id }) => {
    const query = trpc.folders.getById.useQuery({ id });

    switch (query.status) {
        case "error":
            return <span>oh no</span>;
        case "loading":
            return <Loading />;
        case "success":
            return (
                <>
                    <PageTitle>{query.data.name}</PageTitle>
                    <Breadcrumbs folderId={id} />
                </>
            );
    }
};
