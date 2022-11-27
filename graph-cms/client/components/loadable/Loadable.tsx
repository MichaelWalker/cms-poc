import { FC } from "react";
import { Loading } from "../loading/Loading";

type LoadableProps = {};

export const Loadable: FC<LoadableProps> = ({}) => {
    return (
        <div className="h-60 rounded-lg border border-slate-700 bg-slate-800">
            <Loading />
        </div>
    );
};
