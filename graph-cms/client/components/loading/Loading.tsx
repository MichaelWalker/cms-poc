import { FC } from "react";
import styles from "./loading.module.css";

export const Loading: FC = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <span className={styles.loader}></span>
        </div>
    );
};
