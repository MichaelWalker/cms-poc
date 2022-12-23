import { randomUUID } from "crypto";
import { Page } from "graph-cms/shared/domainTypes";
import {
    CreatePageRequest,
    FindInFolderRequest,
    GetByIdRequest,
    UpdatePageRequest,
} from "graph-cms/shared/validations";
import { read, singleOrThrow, write } from "./neo4j-helpers";

export async function getById({ id }: GetByIdRequest): Promise<Page> {
    const response = await read((tx) => {
        return tx.run(
            `
            MATCH (page:Page)
            WHERE page.id = $id
            RETURN page
        `,
            { id }
        );
    });

    return singleOrThrow(response.records).get("page").properties;
}

export async function findInFolder({ folderId }: FindInFolderRequest): Promise<Page[]> {
    const response = await read((tx) => {
        return tx.run(
            `
            MATCH (parent:Folder)-[:CONTAINS_PAGE]->(page:Page)
            WHERE parent.id = $folderId
            RETURN page
        `,
            { folderId }
        );
    });

    return response.records.map((record) => record.get("page").properties);
}

export async function create({ name, url, folderId }: CreatePageRequest) {
    return await write((tx) => {
        return tx.run(
            `
            MATCH (folder:Folder)
            WHERE (folder.id = $folderId)
            CREATE (page:Page { id: $id, name: $name, url: $url, folderId: $folderId })<-[:CONTAINS_PAGE]-(folder)
        `,
            { id: randomUUID(), name, url, folderId }
        );
    });
}

export async function update({ id, name, url }: UpdatePageRequest) {
    return await write((tx) => {
        return tx.run(
            `
            MATCH (page:Page)
            WHERE (page.id = $id)
            SET page.name = $name, page.url = $url
        `,
            { id, name, url }
        );
    });
}
