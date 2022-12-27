import { ReactNode } from "react";
import { Block, BlockEditor } from "./shared/domainTypes";

type AnyBlock = 

export type CmsConfig<TAnyBlock extends Block<any>> = {
    getBlockEditor: (key: TAnyBlock["key"]) => BlockEditor;
    renderBlock: (block: TAnyBlock) => ReactNode;
};
