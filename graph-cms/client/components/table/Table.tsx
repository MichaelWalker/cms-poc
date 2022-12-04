import { FC, ReactNode } from "react";

type TableProps<T> = {
    headers: string[];
    items: T[];
    renderItem: (item: T) => ReactNode;
};

export function Table<T>({ headers, items, renderItem }: TableProps<T>) {
    return (
        <div className="mb-4 rounded-xl bg-white">
            <table className="w-full text-left">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th className="bg-slate-200 py-4 pl-8 text-sm font-light uppercase tracking-wider first:rounded-tl-xl last:rounded-tr-xl">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr className="border-b border-stone-200 last:border-none">{renderItem(item)}</tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
