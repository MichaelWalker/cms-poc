import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButton } from "graph-cms/client/components/buttons/LinkButton";
import { FC } from "react";
import { usePageEditorContext } from "../../PageEditorContext";
import { useContentEditorContext as useContentEditorContext } from "../ContentEditor";

type PageDetailsProps = {};

export const PageDetails: FC<PageDetailsProps> = () => {
    const { goToPageSummary } = useContentEditorContext();
    const { page } = usePageEditorContext();

    return (
        <div className="relative bg-gray-gradient p-8">
            <h2 className="text-4xl text-white">{page.name}</h2>
            <IconButton onClick={goToPageSummary} className="absolute right-8 top-8">
                <ArrowLeftIcon width={20} height={20} />
            </IconButton>
        </div>
    );
};
