import { randomUUID } from "crypto";
import { Folder } from "graph-cms/shared/domainTypes";
import { CreateFolderRequest, FindInFolderRequest } from "graph-cms/shared/validations";
import { read, write } from "./neo4j-helpers";

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

export async function getFolderAndAllAncestors(id: string) {
    return await read((tx) => {
        return tx.run(
            `
            MATCH (ancestor:Folder)-[:CONAINS_FOLDER*..]->(folder:Folder)
            WHERE folder.id = $id 
            RETURN folder, relation, ancestor
        `,
            { id }
        );
    });
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
