import { BlockList } from "net";

export type Folder = {
    id: string;
    name: string;
};

export type Page = {
    id: string;
    name: string;
    url: string;
};

export type PageWithFolderId = Page & { folderId: string };

export type Template = {
    id: string;
    name: string;
};

export type FieldEditor<T> = {};

export type BlockEditor<T> = {};

export type Field = string | number | boolean | Block;

export type Block = {
    type: string;
    data: Record<string, Field>;
};

export type FieldNode = { id: string } & (
    | { type: "string"; value: string }
    | { type: "number"; value: number }
    | { type: "boolean"; value: boolean }
    | { type: "block"; value: HasBlockRelation }
);

export type BlockNode = {
    id: string;
    type: string;
    fieldRelations: HasFieldRelation[];
};

export type HasFieldRelation = {
    key: string;
    field: FieldNode;
};

export type HasBlockRelation = {
    block: BlockNode;
};
