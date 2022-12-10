import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Page } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { CmsLink } from "../../typography/CmsLink";

type ActionBarProps = {
    page: Page;
};

export const ActionBar: FC<ActionBarProps> = ({ page }) => {
    return (
        <div className="col-span-2 flex flex-row items-center bg-white px-8 py-4">
            <CmsLink href={`/cms/folders/${page.folderId}`}>
                <ArrowLeftIcon className="mr-1" width="20" height="20" />
                Back
            </CmsLink>

            <h1 className="mx-16 flex-grow text-3xl font-light tracking-wider">{page.name}</h1>

            <PrimaryButton>Publish</PrimaryButton>
        </div>
    );
};
