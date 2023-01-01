import { SectionHeader } from "graph-cms/client/components/headers/SectionHeader";
import { FC } from "react";
import { usePageEditorContext } from "../../PageEditorContext";
import { BlockEditor } from "./BlockEditor";

type BlocksEditorProps = {};

export const BlocksEditor: FC<BlocksEditorProps> = ({}) => {
    const { rootBlock } = usePageEditorContext();

    return (
        <div className="p-8">
            <SectionHeader>Content</SectionHeader>
            <BlockEditor blockNode={rootBlock} />
        </div>
    );
};
