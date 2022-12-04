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
                <style
                    dangerouslySetInnerHTML={{
                        __html: `@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap");`,
                    }}
                />
            </Head>
            <main className={className}>{children}</main>
        </>
    );
};
