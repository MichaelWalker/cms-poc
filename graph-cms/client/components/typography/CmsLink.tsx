import { FocusRing } from "@react-aria/focus";
import Link from "next/link";
import { FC, ReactNode } from "react";

type CmsLinkProps = {
    href: string;
    children: ReactNode;
    color?: string;
};

export const CmsLink: FC<CmsLinkProps> = ({ href, children, color = "black" }) => {
    return (
        <FocusRing focusRingClass={`ring-1 ring-${color}`}>
            <Link
                href={href}
                className={`-mx-2 rounded px-2 py-1 font-medium outline-none hover:underline text-${color}`}
            >
                {children}
            </Link>
        </FocusRing>
    );
};
