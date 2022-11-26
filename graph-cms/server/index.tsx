import { createNextApiHandler } from "@trpc/server/adapters/next";
import { CmsConfig } from "graph-cms";
import { appRouter } from "./api";

export function createCmsApiHandler(config: CmsConfig) {
    return createNextApiHandler({ router: appRouter, createContext: () => ({}) });
}
