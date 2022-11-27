import { z } from "zod";

export const createFolderRequest = z.object({
    name: z.string(),
    parentId: z.string().uuid(),
});

export const getFoldersInFolderRequest = z.object({
    folderId: z.string().uuid(),
});

export type CreateFolderRequest = z.infer<typeof createFolderRequest>;
export type GetFoldersInFolderRequest = z.infer<typeof getFoldersInFolderRequest>;
