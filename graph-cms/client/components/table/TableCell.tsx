import { FC, ReactNode } from "react";

type TableCellProps = {
    children: ReactNode;
};

export const TableCell: FC<TableCellProps> = ({ children }) => {
    return <td className="py-4 pl-8 last:pr-8">{children}</td>;
};
