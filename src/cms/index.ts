import { CmsConfig, createRenderer } from "graph-cms";
import { footerBlock } from "src/blocks/Footer";
import { headerBlock } from "src/blocks/Header";
import { heroSectionBlock } from "src/blocks/HeroSection";
import { pageBlock } from "src/blocks/Page";

const blocks = [pageBlock, heroSectionBlock, headerBlock, footerBlock];
export const BlockRenderer = createRenderer(blocks);

export const cmsConfig: CmsConfig = {
    blocks,
};
