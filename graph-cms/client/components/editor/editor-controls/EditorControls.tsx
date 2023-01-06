import { FC } from "react";
import { CmsLink } from "../../typography/CmsLink";
import { usePageEditorContext } from "../PageEditorContext";
import { ExternalLinkIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { BlocksEditor } from "./blocks-editor/BlocksEditor";
import { IconButton } from "../../buttons/LinkButton";

type EditorControlsProps = {};

export const EditorControls: FC<EditorControlsProps> = () => {
    const { page } = usePageEditorContext();

    return (
        <div className="col-start-2 col-end-3 row-start-3 row-end-4 w-[40rem] min-w-[44rem] overflow-y-auto px-8 [&>*]:mb-8">
            <div className="overflow-hidden rounded-xl bg-white">
                <div className="relative bg-gradient-to-br from-gray-600 to-gray-800 p-8">
                    <h2 className="text-4xl text-white">{page.name}</h2>
                    <CmsLink href={page.url} target="_blank" color="white">
                        view in new tab <ExternalLinkIcon className="ml-2" />
                    </CmsLink>
                    <IconButton className="absolute right-8 top-8">
                        <Pencil1Icon width={20} height={20} />
                    </IconButton>
                </div>
                <BlocksEditor />
            </div>
        </div>
    );
};
