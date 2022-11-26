import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import { AppRouter } from "graph-cms/server/api";

export const trpc = createTRPCNext<AppRouter>({
    config({ ctx }) {
        return { links: [httpBatchLink({ url: `http://localhost:3000/api/cms` })] };
    },
    ssr: true,
});
