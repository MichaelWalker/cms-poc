import { z } from "zod";

// TODO - improve this
export const blockSchema = z.object({
    block: z.object({
        id: z.string().uuid(),
        type: z.string().trim().min(1),
        fieldRelations: z.array(z.object({})),
    }),
});

export const createFolderRequest = z.object({
    name: z.string().trim().min(1),
    parentId: z.string().uuid(),
});

export const createPageRequest = z.object({
    name: z.string().trim().min(1),
    url: z.string().trim().min(1),
    folderId: z.string().uuid(),
});

export const updatePageRequest = z.object({
    id: z.string().uuid(),
    name: z.string().trim().min(1),
    url: z.string().trim().min(1),
});

export const createTemplateRequest = z.object({
    name: z.string().trim().min(1),
    folderId: z.string().uuid(),
});

export const getByIdRequest = z.object({
    id: z.string().uuid(),
});

export const findInFolderRequest = z.object({
    folderId: z.string().uuid(),
});

export const getBreadcrumbsRequest = z.object({
    folderId: z.string().uuid(),
});

export const getByPageIdRequest = z.object({
    pageId: z.string().uuid(),
});

export type CreateFolderRequest = z.infer<typeof createFolderRequest>;
export type CreatePageRequest = z.infer<typeof createPageRequest>;
export type UpdatePageRequest = z.infer<typeof updatePageRequest>;
export type CreateTemplateRequest = z.infer<typeof createTemplateRequest>;
export type GetByIdRequest = z.infer<typeof getByIdRequest>;
export type FindInFolderRequest = z.infer<typeof findInFolderRequest>;
export type GetBreadcrumbsRequest = z.infer<typeof getBreadcrumbsRequest>;
export type GetByPageIdRequest = z.infer<typeof getByPageIdRequest>;
