import { FocusRing } from "@react-aria/focus";
import Link from "next/link";
import { FC, ReactNode } from "react";

type CmsLinkProps = {
    href: string;
    children: ReactNode;
    color?: "black" | "white";
};

export const CmsLink: FC<CmsLinkProps> = ({ href, children, color = "black" }) => {
    function getRingColorClass() {
        switch (color) {
            case "black":
                return "ring-fuchsia-600";
            case "white":
                return "ring-white";
        }
    }

    function getTextCollorClass() {
        switch (color) {
            case "black":
                return "text-black";
            case "white":
                return "text-white";
        }
    }

    return (
        <FocusRing focusRingClass={`ring-1 ${getRingColorClass()}`}>
            <Link
                href={href}
                className={`-mx-2 rounded px-2 py-1 font-medium outline-none hover:underline ${getTextCollorClass()} flex w-fit grow-0 flex-row items-center`}
            >
                {children}
            </Link>
        </FocusRing>
    );
};
