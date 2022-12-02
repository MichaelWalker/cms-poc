import { procedure, router } from "./trpc";
import {
    createFolderRequest,
    getFoldersInFolderRequest,
    getPagesInFolderRequest,
    getTemplatesInFolderRequest,
} from "graph-cms/shared/validations/folderValidation";
import { getFoldersInFolder, getPagesInFolder, getTemplatesInFolder, createFolder } from "./services/folders";

const foldersRouter = router({
    getFoldersInFolder: procedure.input(getFoldersInFolderRequest).query(({ input }) => getFoldersInFolder(input)),
    getPagesInFolder: procedure.input(getPagesInFolderRequest).query(({ input }) => getPagesInFolder(input)),
    getTemplateInFolder: procedure.input(getTemplatesInFolderRequest).query(({ input }) => getTemplatesInFolder(input)),
    create: procedure.input(createFolderRequest).mutation(({ input }) => createFolder(input)),
});

export const appRouter = router({
    folders: foldersRouter,
});

export type AppRouter = typeof appRouter;
