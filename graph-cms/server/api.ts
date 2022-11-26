import { procedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
    hello: procedure.input(z.object({ name: z.string() })).query(({ input }) => `hello ${input.name}`),
});

export type AppRouter = typeof appRouter;
