import { randomUUID } from "crypto";
import { Folder } from "graph-cms/shared/domainTypes";
import {
    CreateFolderRequest,
    FindInFolderRequest,
    GetBreadcrumbsRequest,
    GetByIdRequest,
} from "graph-cms/shared/validations";
import { read, singleOrThrow, write } from "./neo4j-helpers";

type Breadcrumb = {
    id: string;
    name: string;
};

export async function getById({ id }: GetByIdRequest): Promise<Folder> {
    const response = await read((tx) => {
        return tx.run(
            `
            MATCH (folder:Folder)
            WHERE folder.id = $id
            RETURN folder
        `,
            { id }
        );
    });

    return singleOrThrow(response.records).get("folder").properties;
}

export async function create({ name, parentId }: CreateFolderRequest) {
    await write((tx) => {
        tx.run(
            `
                MATCH (parent:Folder) 
                WHERE parent.id = $parentId
                CREATE (folder:Folder { id: $id, name: $name })<-[:CONTAINS_FOLDER]-(parent)
            `,
            { id: randomUUID(), name, parentId }
        );
    });
}

export async function getBreadcrumbs({ folderId }: GetBreadcrumbsRequest): Promise<Breadcrumb[]> {
    const response = await read((tx) => {
        return tx.run(
            `
            MATCH (ancestor:Folder)-[:CONTAINS_FOLDER*..]->(folder:Folder)
            WHERE folder.id = $folderId 
            RETURN ancestor
        `,
            { folderId }
        );
    });

    return response.records.map((record) => record.get("ancestor").properties).reverse();
}

export async function findInFolder({ folderId }: FindInFolderRequest): Promise<Folder[]> {
    const response = await read((tx) => {
        return tx.run(
            `
            MATCH (parent:Folder)-[:CONTAINS_FOLDER]->(folder:Folder)
            WHERE parent.id = $folderId
            RETURN folder
            ORDER BY folder.name
        `,
            { folderId }
        );
    });

    return response.records.map((record) => record.get("folder").properties);
}
