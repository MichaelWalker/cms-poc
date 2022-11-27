import { trpc } from "graph-cms/client/trpc";
import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
