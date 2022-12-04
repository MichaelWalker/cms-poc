import { randomUUID } from "crypto";
import { Template } from "graph-cms/shared/domainTypes";
import { CreateTemplateRequest, FindInFolderRequest } from "graph-cms/shared/validations";
import { read, write } from "./neo4j-helpers";

export async function findInFolder({ folderId }: FindInFolderRequest): Promise<Template[]> {
    const response = await read((tx) => {
        return tx.run(
            `
            MATCH (parent:Folder)-[:CONTAINS_FOLDER]->(template:Template)
            WHERE parent.id = $folderId
            RETURN template
        `,
            { folderId }
        );
    });

    return response.records.map((record) => record.get("template").properties);
}

export async function create({ name, folderId }: CreateTemplateRequest) {
    return await write((tx) => {
        return tx.run(
            `
            MATCH (folder:Folder)
            WHERE (folder.id = $folderId)
            CREATE (page:Page { id: $id, name: $name, folderId: $folderId })<-[:CONTAINS_PAGE]-(folder)
        `,
            { id: randomUUID(), name, folderId }
        );
    });
}
