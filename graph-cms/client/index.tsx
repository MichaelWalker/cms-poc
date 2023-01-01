import { CmsConfig } from "graph-cms";
import { placeholderBlockDefinition } from "./components/editor/placeholder-block/PlaceholderBlock";
import { Pages } from "./Pages";

export function createCmsPageHandler(config: CmsConfig) {
    return () => <Pages blockDefinitions={[...config.blocks, placeholderBlockDefinition]} />;
}
