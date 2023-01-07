import { CmsConfig } from "graph-cms";
import { createBlockRenderer } from "graph-cms/client/BlockRenderer";
import { footerBlock } from "src/blocks/Footer";
import { headerBlock } from "src/blocks/Header";
import { heroSectionBlock } from "src/blocks/HeroSection";
import { pageBlock } from "src/blocks/Page";

const blocks = [pageBlock, heroSectionBlock, headerBlock, footerBlock];
export const BlockRenderer = createBlockRenderer(blocks);

export const cmsConfig: CmsConfig = {
    blocks,
};
