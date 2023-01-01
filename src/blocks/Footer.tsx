import { block } from "graph-cms";
import Link from "next/link";
import { FC } from "react";
import { z } from "zod";

const footerSchema = z.object({});

type FooterProps = z.infer<typeof footerSchema>;

const Footer: FC<FooterProps> = ({}) => {
    return <Link href="/">Contact Us</Link>;
};

export const footerBlock = block({
    type: "footer",
    schema: footerSchema,
    component: Footer,
    fields: {},
});
