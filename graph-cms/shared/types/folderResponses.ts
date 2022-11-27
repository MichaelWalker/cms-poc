type Folder = {
    id: string;
    name: string;
};

type Page = {
    id: string;
    url: string;
    name: string;
};

type Template = {
    id: string;
    name: string;
};

export type GetFoldersInFolderResponse = Folder[];
export type GetPagesInFolderResponse = Page[];
export type GetTemplatesInFolderResponse = Template[];
