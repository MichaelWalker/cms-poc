import { Card } from "graph-cms/client/components/card/Card";
import { TextInput } from "graph-cms/client/components/forms/inputs/TextInput";
import { SectionHeader } from "graph-cms/client/components/headers/SectionHeader";
import { preventDefault } from "graph-cms/client/utils/form-utils";
import { FC } from "react";
import { z } from "zod";
import { usePageEditorContext } from "../../PageEditorContext";

const pageSettingsSchema = z.object({
    name: z.string().trim().min(1),
    url: z.string().url(),
});

export const PageSettings: FC = () => {
    const { nameField, urlField } = usePageEditorContext();

    return (
        <Card>
            <SectionHeader>Page Settings</SectionHeader>
            <form onSubmit={preventDefault}>
                <TextInput {...nameField} />
                <TextInput {...urlField} />
            </form>
        </Card>
    );
};
