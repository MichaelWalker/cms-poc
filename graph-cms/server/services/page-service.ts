import { BlockNode } from "graph-cms/shared/domainTypes";
import * as pageRepo from "../repos/pageRepo";

type UpdatePageRequest = {
    id: string;
    url: string;
    name: string;
    rootBlock: BlockNode;
};

export function updatePage({ id, url, name, rootBlock }: UpdatePageRequest) {
    pageRepo.update({ id, name, url });
}
