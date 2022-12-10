import { FC, ReactNode } from "react";

type CardProps = {
    children: ReactNode;
};

export const Card: FC<CardProps> = ({ children }) => {
    return <section className="rounded-xl bg-white p-8">{children}</section>;
};
