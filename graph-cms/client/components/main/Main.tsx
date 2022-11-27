import { trpc } from "graph-cms/client/trpc";
import Head from "next/head";
import { FC, ReactNode } from "react";

type MainProps = {
    className?: string;
    children: ReactNode;
};

export const Main: FC<MainProps> = ({ className, children }) => {
    return (
        <>
            <Head>
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap');
                </style>
            </Head>
            <main
                className={`min-h-screen bg-gradient-to-tl from-slate-900 to-slate-800 font-['Poppins'] ${className}`}
            >
                {children}
            </main>
        </>
    );
};
