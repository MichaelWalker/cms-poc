import { randomUUID } from "crypto";
import { read, write } from "./neo4j-helpers";

export async function createFolder(name: string, parentId: string) {
    return await write((tx) => {
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

export async function getFoldersInFolder(id: string) {
    return await read((tx) => {
        return tx.run(
            `
            MATCH (parent:Folder)-[:CONTAINS_FOLDER]->(child:Folder)
            WHERE parent.id = $id
            RETURN child
        `,
            { id }
        );
    });
}

export async function getPagesInFolder(id: string) {
    return await read((tx) => {
        return tx.run(
            `
            MATCH (parent:Folder)-[:CONTAINS_FOLDER]->(child:Page)
            WHERE parent.id = $id
            RETURN child
        `,
            { id }
        );
    });
}
