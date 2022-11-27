import { procedure, router } from "./trpc";
import { z } from "zod";
import { getFoldersInFolderRequest } from "graph-cms/shared/validations/folderValidation";
import { getFoldersInFolder } from "./services/folders";

const foldersRouter = router({
    getFoldersInFolder: procedure.input(getFoldersInFolderRequest).query(({ input }) => getFoldersInFolder(input)),
});

export const appRouter = router({
    folders: foldersRouter,
});

export type AppRouter = typeof appRouter;
