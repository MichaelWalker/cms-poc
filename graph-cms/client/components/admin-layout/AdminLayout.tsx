import { FC, ReactNode } from "react";
import { Main } from "../main/Main";

type AdminLayoutProps = {
    title: string;
    children: ReactNode;
};

export const AdminLayout: FC<AdminLayoutProps> = ({ title, children }) => {
    return (
        <Main>
            <div className="m-auto max-w-screen-2xl px-8 py-16">
                <h1 className="mb-16 text-5xl text-slate-100">{title}</h1>
                {children}
            </div>
        </Main>
    );
};
