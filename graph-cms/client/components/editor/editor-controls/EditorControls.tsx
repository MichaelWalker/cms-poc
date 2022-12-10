import { FC } from "react";
import { BlocksEditor } from "./blocks-editor/BlocksEditor";
import { PageSettings } from "./page-settings/PageSettings";

type EditorControlsProps = {};

export const EditorControls: FC<EditorControlsProps> = ({}) => {
    return (
        <div className="mx-8 w-[40rem] overflow-y-auto [&>*]:mt-8">
            <PageSettings />
            <BlocksEditor />
        </div>
    );
};
