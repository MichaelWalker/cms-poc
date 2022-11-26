import { NextApiHandler, NextPage } from "next";
import { Pages } from "./client/Pages";
import { apiHandler } from "./server/api";

type CmsConfig = {};

type Cms = {
    api: NextApiHandler;
    pages: NextPage;
};

export function createCms(config: CmsConfig): Cms {
    return {
        api: apiHandler,
        pages: Pages,
    };
}
