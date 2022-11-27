import { z } from "zod";

const createFolderRequest = z.object({
    name: z.string(),
    parentId: z.string().uuid(),
});

const getFolderRequest = z.object({
    id: z.string().uuid(),
});

export type CreateFolderRequest = z.infer<typeof createFolderRequest>;
export type GetFolderRequest = z.infer<typeof getFolderRequest>;
