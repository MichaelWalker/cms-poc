import { BlockDefinition } from "graph-cms";
import { trpc } from "graph-cms/client/trpc";
import { addBlockNodeToTree } from "graph-cms/shared/block-utils";
import { BlockNode, FieldNode, PageWithFolderId } from "graph-cms/shared/domainTypes";
import { updatePageRequest } from "graph-cms/shared/validations";
import { createContext, FC, ReactNode, useCallback, useContext, useState } from "react";
import { z } from "zod";
import { useForm } from "../forms/useForm";
import { FormField, useFormField } from "../forms/useFormField";

type PageEditorContext = {
    page: PageWithFolderId;
    rootBlock: BlockNode | null;
    blockDefinitions: BlockDefinition<any>[];
    nameField: FormField<string>;
    urlField: FormField<string>;
    canSavePage: boolean;
    savePage: () => void;
    createBlock: (blockNode: BlockNode, fieldNode: FieldNode | null) => void;
    updateBlock: (blockNode: BlockNode) => void;
    deleteBlock: (blockNodeId: string) => void;
};

type PageEditorContextProviderProps = {
    page: PageWithFolderId;
    content: BlockNode | null;
    blockDefinitions: BlockDefinition<any>[];
    children: ReactNode;
};

const pageEditorContext = createContext<PageEditorContext>(undefined as never);
const settingsSchema = updatePageRequest.pick({ name: true, url: true });
type SettingsSchema = z.infer<typeof settingsSchema>;

export const PageEditorContextProvider: FC<PageEditorContextProviderProps> = ({
    page,
    content,
    blockDefinitions,
    children,
}) => {
    const [updatedContent, setUpdatedContent] = useState(content);

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

    const createBlock = useCallback((blockNode: BlockNode, fieldNode: FieldNode | null) => {
        if (!fieldNode) {
            // If there is no field node, we are creating a root block
            setUpdatedContent(blockNode);
            return;
        }

        setUpdatedContent((previousContent) => addBlockNodeToTree(previousContent!!, blockNode, fieldNode));
    }, []);

    const updateBlock = useCallback((blockNode: BlockNode) => {}, []);

    const deleteBlock = useCallback((blockNodeId: string) => {}, []);

    return (
        <pageEditorContext.Provider
            value={{
                page,
                rootBlock: updatedContent,
                blockDefinitions,
                nameField,
                urlField,
                canSavePage: settingsForm.isValid,
                savePage,
                createBlock,
                updateBlock,
                deleteBlock,
            }}
        >
            {children}
        </pageEditorContext.Provider>
    );
};

export function usePageEditorContext(): PageEditorContext {
    return useContext(pageEditorContext);
}
