import { block } from "graph-cms";
import { blockField } from "graph-cms/shared/fields";
import { blockSchema } from "graph-cms/shared/validations";
import { FC } from "react";
import { BlockRenderer } from "src/cms";
import { z } from "zod";

const pageSchema = z.object({
    header: blockSchema,
    main: blockSchema,
    footer: blockSchema,
});

type PageProps = z.infer<typeof pageSchema>;

const Page: FC<PageProps> = ({ header, main, footer }) => {
    return (
        <div>
            <header>
                <BlockRenderer {...header} />
            </header>
            <main>
                <BlockRenderer {...main} />
            </main>
            <footer>
                <BlockRenderer {...footer} />
            </footer>
        </div>
    );
};

export const pageBlock = block({
    type: "page",
    schema: pageSchema,
    component: Page,
    fields: {
        header: blockField({ label: "Header" }),
        main: blockField({ label: "Main" }),
        footer: blockField({ label: "Footer" }),
    },
});
