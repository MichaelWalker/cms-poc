import { z } from "zod";

const createFolderRequest = z.object({
    name: z.string(),
    parentId: z.string().uuid().optional(),
});

export type CreateFolderRequest = z.infer<typeof createFolderRequest>;
