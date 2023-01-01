import { block } from "graph-cms";
import Link from "next/link";
import { FC } from "react";
import { z } from "zod";

const headerSchema = z.object({});

type HeaderProps = z.infer<typeof headerSchema>;

const Header: FC<HeaderProps> = ({}) => {
    return (
        <nav>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Some other link</Link>
        </nav>
    );
};

export const headerBlock = block({
    type: "header",
    schema: headerSchema,
    component: Header,
    fields: {},
});
