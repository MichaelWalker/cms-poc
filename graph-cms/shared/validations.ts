import { z } from "zod";

export const createFolderRequest = z.object({
    name: z.string().trim().min(1),
    parentId: z.string().uuid(),
});

export const createPageRequest = z.object({
    name: z.string().trim().min(1),
    url: z.string().trim().min(1),
    folderId: z.string().uuid(),
});

export const createTemplateRequest = z.object({
    name: z.string().trim().min(1),
    folderId: z.string().uuid(),
});

export const getFolderById = z.object({
    id: z.string().uuid(),
});

export const findInFolderRequest = z.object({
    folderId: z.string().uuid(),
});

export const getBreadcrumbsRequest = z.object({
    folderId: z.string().uuid(),
});

export type CreateFolderRequest = z.infer<typeof createFolderRequest>;
export type CreatePageRequest = z.infer<typeof createPageRequest>;
export type CreateTemplateRequest = z.infer<typeof createTemplateRequest>;
export type GetFolderById = z.infer<typeof getFolderById>;
export type FindInFolderRequest = z.infer<typeof findInFolderRequest>;
export type GetBreadcrumbsRequest = z.infer<typeof getBreadcrumbsRequest>;
