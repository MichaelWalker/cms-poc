import { FC, ReactNode } from "react";

type PageTitleProps = {
    children: ReactNode;
};

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
    return <h1 className="text-5xl font-medium tracking-wider text-white">{children}</h1>;
};
