import { CmsConfig } from "graph-cms";
import { Pages } from "./Pages";

export function createCmsPageHandler(config: CmsConfig) {
    return Pages;
}
