import { Card } from "graph-cms/client/components/card/Card";
import { SectionHeader } from "graph-cms/client/components/headers/SectionHeader";
import { FC } from "react";

type BlocksEditorProps = {};

export const BlocksEditor: FC<BlocksEditorProps> = ({}) => {
    return (
        <Card>
            <SectionHeader>Content</SectionHeader>
        </Card>
    );
};
