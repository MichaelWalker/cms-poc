import { trpc } from "graph-cms/client/trpc";
import { Page } from "graph-cms/shared/domainTypes";
import { updatePageRequest } from "graph-cms/shared/validations";
import { createContext, FC, ReactNode, useCallback, useContext } from "react";
import { z } from "zod";
import { useForm } from "../forms/useForm";
import { FormField, useFormField } from "../forms/useFormField";

type PageEditorContext = {
    page: Page;
    nameField: FormField<string>;
    urlField: FormField<string>;
    savePage: () => void;
    canSavePage: boolean;
};

type PageEditorContextProviderProps = {
    page: Page;
    children: ReactNode;
};

const pageEditorContext = createContext<PageEditorContext>(undefined as never);
const settingsSchema = updatePageRequest.pick({ name: true, url: true });
type SettingsSchema = z.infer<typeof settingsSchema>;

export const PageEditorContextProvider: FC<PageEditorContextProviderProps> = ({ page, children }) => {
    const pageMutation = trpc.pages.update.useMutation();

    const nameField = useFormField({ label: "Name", initialValue: page.name });
    const urlField = useFormField({ label: "URL", initialValue: page.url });

    const settingsForm = useForm<SettingsSchema>({
        schema: settingsSchema,
        fields: {
            name: nameField,
            url: urlField,
        },
    });

    const savePage = useCallback(() => {
        if (!settingsForm.isValid) {
            return;
        }

        const settings = settingsForm.data;

        pageMutation.mutate({
            id: page.id,
            ...settings,
        });
    }, [page, settingsForm]);

    return (
        <pageEditorContext.Provider
            value={{
                page,
                nameField,
                urlField,
                savePage,
                canSavePage: settingsForm.isValid,
            }}
        >
            {children}
        </pageEditorContext.Provider>
    );
};

export function usePageEditorContext(): PageEditorContext {
    return useContext(pageEditorContext);
}
