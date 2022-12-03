import { FC, ReactNode } from "react";

type SectionHeaderProps = {
    children: ReactNode;
};

export const SectionHeader: FC<SectionHeaderProps> = ({ children }) => {
    return <h2 className="mb-6 text-xl text-black">{children}</h2>;
};
