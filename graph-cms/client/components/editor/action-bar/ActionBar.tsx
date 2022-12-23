import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { FC } from "react";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { CmsLink } from "../../typography/CmsLink";
import { usePageEditorContext } from "../PageEditorContext";

type ActionBarProps = {};

export const ActionBar: FC<ActionBarProps> = () => {
    const { page, canSavePage, savePage } = usePageEditorContext();
    const router = useRouter();

    const folderUrl = `/cms/folders/${page.folderId}`;

    function handleSave() {
        savePage();
        router.push(folderUrl);
    }

    return (
        <div className="col-span-2 flex flex-row items-center bg-white px-8 py-4">
            <CmsLink href={folderUrl}>
                <ArrowLeftIcon className="mr-1" width="20" height="20" />
                Back
            </CmsLink>

            <h1 className="mx-16 flex-grow text-3xl font-light tracking-wider">{page.name}</h1>

            <PrimaryButton onClick={handleSave} disabled={!canSavePage}>
                Publish
            </PrimaryButton>
        </div>
    );
};
