import { FC } from "react";
import { usePageEditorContext } from "../PageEditorContext";
import { BlocksEditor } from "./blocks-editor/BlocksEditor";
import { PageSettings } from "./page-settings/PageSettings";

type EditorControlsProps = {};

export const EditorControls: FC<EditorControlsProps> = () => {
    const { page } = usePageEditorContext();

    return (
        <div className="col-start-2 col-end-3 row-start-3 row-end-4 w-[40rem] min-w-[44rem] overflow-y-auto px-8 [&>*]:mb-8">
            <PageSettings page={page} />
            <BlocksEditor />
        </div>
    );
};
