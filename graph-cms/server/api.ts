import { procedure, router } from "./trpc";
import {
    createFolderRequest,
    createPageRequest,
    createTemplateRequest,
    findInFolderRequest,
    getBreadcrumbsRequest,
    getByIdRequest,
    getByPageIdRequest,
    updatePageRequest,
} from "graph-cms/shared/validations";
import * as folderRepo from "./repos/folderRepo";
import * as pageRepo from "./repos/pageRepo";
import * as templateRepo from "./repos/templateRepo";
import * as contentRepo from "./repos/contentRepo";

const foldersRouter = router({
    getById: procedure.input(getByIdRequest).query(({ input }) => folderRepo.getById(input)),
    findInFolder: procedure.input(findInFolderRequest).query(({ input }) => folderRepo.findInFolder(input)),
    getBreadcrumbs: procedure.input(getBreadcrumbsRequest).query(({ input }) => folderRepo.getBreadcrumbs(input)),
    create: procedure.input(createFolderRequest).mutation(({ input }) => folderRepo.create(input)),
});

const pagesRouter = router({
    getByIdWithParentFolder: procedure
        .input(getByIdRequest)
        .query(({ input }) => pageRepo.getByIdWithParentFolder(input)),
    findInFolder: procedure.input(findInFolderRequest).query(({ input }) => pageRepo.findInFolder(input)),
    create: procedure.input(createPageRequest).mutation(({ input }) => pageRepo.create(input)),
    update: procedure.input(updatePageRequest).mutation(({ input }) => pageRepo.update(input)),
});

const templatesRouter = router({
    findInFolder: procedure.input(findInFolderRequest).query(({ input }) => templateRepo.findInFolder(input)),
    create: procedure.input(createTemplateRequest).mutation(({ input }) => templateRepo.create(input)),
});

const contentRouter = router({
    getRootBlockByPageId: procedure
        .input(getByPageIdRequest)
        .query(({ input }) => contentRepo.getRootBlockForPage(input)),
});

export const appRouter = router({
    folders: foldersRouter,
    pages: pagesRouter,
    templates: templatesRouter,
    content: contentRouter,
});

export type AppRouter = typeof appRouter;
