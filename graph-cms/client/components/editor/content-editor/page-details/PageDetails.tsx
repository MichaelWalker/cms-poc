import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButton } from "graph-cms/client/components/buttons/LinkButton";
import { FC } from "react";
import { usePageEditorContext } from "../../PageEditorContext";

type PageDetailsProps = {
    goToBlockList: () => void;
};

export const PageDetails: FC<PageDetailsProps> = ({ goToBlockList }) => {
    const { page } = usePageEditorContext();

    return (
        <div className="relative bg-gray-gradient p-8">
            <h2 className="text-4xl text-white">{page.name}</h2>
            <IconButton onClick={goToBlockList} className="absolute right-8 top-8">
                <ArrowLeftIcon width={20} height={20} />
            </IconButton>
        </div>
    );
};
