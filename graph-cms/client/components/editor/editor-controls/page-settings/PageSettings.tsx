import { Card } from "graph-cms/client/components/card/Card";
import { TextInput } from "graph-cms/client/components/forms/inputs/TextInput";
import { useForm } from "graph-cms/client/components/forms/useForm";
import { useFormField } from "graph-cms/client/components/forms/useFormField";
import { SectionHeader } from "graph-cms/client/components/headers/SectionHeader";
import { Page } from "graph-cms/shared/domainTypes";
import { FC } from "react";
import { z } from "zod";

type PageSettingsProps = {
    page: Page;
};

const pageSettingsSchema = z.object({
    name: z.string().trim().min(1),
    url: z.string().url(),
});

export const PageSettings: FC<PageSettingsProps> = ({ page }) => {
    const nameField = useFormField({ label: "Name", initialValue: page.name });
    const urlField = useFormField({ label: "URL", initialValue: page.url });

    const { handleSubmit } = useForm({
        schema: pageSettingsSchema,
        fields: {
            name: nameField,
            url: urlField,
        },
    });

    return (
        <Card>
            <SectionHeader>Page Settings</SectionHeader>
            <form onSubmit={handleSubmit}>
                <TextInput {...nameField} />
                <TextInput {...urlField} />
            </form>
        </Card>
    );
};
