import Link from "next/link";
import { FC } from "react";

export const HomePage: FC = () => {
    return (
        <div>
            <Link className="block" href="/cms/folders/foo">
                Folder
            </Link>
            <Link className="block" href="/cms/pages/foo">
                Page
            </Link>
        </div>
    );
};
