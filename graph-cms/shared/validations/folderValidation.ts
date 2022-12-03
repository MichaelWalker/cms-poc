import { z } from "zod";

export const createFolderRequest = z.object({
    name: z.string().trim().min(1),
    parentId: z.string().uuid(),
});

export const getFoldersInFolderRequest = z.object({
    folderId: z.string().uuid(),
});

export const getPagesInFolderRequest = z.object({
    folderId: z.string().uuid(),
});

export const getTemplatesInFolderRequest = z.object({
    folderId: z.string().uuid(),
});

export type CreateFolderRequest = z.infer<typeof createFolderRequest>;
export type GetFoldersInFolderRequest = z.infer<typeof getFoldersInFolderRequest>;
export type GetPagesInFolderRequest = z.infer<typeof getPagesInFolderRequest>;
export type GetTemplatesInFolderRequest = z.infer<typeof getTemplatesInFolderRequest>;
