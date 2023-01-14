import { ExternalLinkIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { IconButton } from "graph-cms/client/components/buttons/LinkButton";
import { CmsLink } from "graph-cms/client/components/typography/CmsLink";
import { FC } from "react";
import { usePageEditorContext } from "../../PageEditorContext";
import { useContentEditorContext } from "../ContentEditor";
import { BlockListItem } from "./BlockListItem";

type PageSummaryProps = {};

export const PageSummary: FC<PageSummaryProps> = () => {
    const { goToPageDetails, goToCreateBlock, goToBlockDetails } = useContentEditorContext();
    const { page, rootBlock } = usePageEditorContext();

    return (
        <>
            <div className="relative bg-gray-gradient p-8">
                <h2 className="text-4xl text-white">{page.name}</h2>
                <CmsLink href={page.url} target="_blank" color="white">
                    view in new tab <ExternalLinkIcon className="ml-2" />
                </CmsLink>
                <IconButton onClick={goToPageDetails} className="absolute right-8 top-8">
                    <Pencil1Icon width={20} height={20} />
                </IconButton>
            </div>
            <div className="p-8">
                <h3 className="mb-4 text-2xl">Blocks</h3>
                <BlockListItem
                    label="Root Block"
                    block={rootBlock}
                    field={null}
                    goToCreateBlock={goToCreateBlock}
                    goToBlockDetails={goToBlockDetails}
                />
            </div>
        </>
    );
};
