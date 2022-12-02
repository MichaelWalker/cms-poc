import { FC, ReactNode } from "react";
import { Main } from "../main/Main";

type AdminLayoutProps = {
    title: string;
    children: ReactNode;
};

export const AdminLayout: FC<AdminLayoutProps> = ({ title, children }) => {
    return (
        <div className="m-auto flex max-w-screen-xl bg-white px-8 font-['Poppins']">
            <nav className="mr-8 h-96 w-14 self-center rounded-3xl bg-stone-100"></nav>
            <div className="flex min-h-screen flex-grow flex-col overflow-y-auto">
                <header className="flex flex-row items-center py-8">
                    <div className="mr-16 flex-grow rounded-3xl bg-stone-100 px-8 py-4">search</div>
                    <div className="">Mike Walker</div>
                </header>
                <Main className="relative overflow-hidden rounded-3xl bg-stone-100">
                    <img src="/mountains.jpg" className="h-64 w-full object-cover object-[0%_15%]" />
                    <div className="absolute top-0 h-64 w-full bg-gradient-to-b from-transparent via-transparent to-slate-100" />
                    <h1 className="font- absolute top-12 left-8 text-5xl font-medium tracking-wider text-white">
                        {title}
                    </h1>
                    <div className="m-8 mt-0">{children}</div>
                </Main>
            </div>
        </div>
    );
};
