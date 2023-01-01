import { blockSchema } from "graph-cms/shared/validations";
import { z } from "zod";

const rootBlockSchema = z.object({
    block: blockSchema,
});
