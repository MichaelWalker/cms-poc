import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { ReactElement, ReactNode } from "react";
import { Loading } from "../loading/Loading";

type LoadableProps<TData, TError> = {
    query: UseTRPCQueryResult<TData, TError>;
    children: (data: TData) => ReactElement;
};

export function Loadable<TData, TError>({ query, children }: LoadableProps<TData, TError>): ReactElement {
    switch (query.status) {
        case "loading":
            return (
                <div className="h-60 rounded-lg border border-slate-700 bg-slate-800">
                    <Loading />
                </div>
            );
        case "error":
            return <div>Oh no!</div>;
        case "success":
            return children(query.data);
    }
}
