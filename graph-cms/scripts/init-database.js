const neo4j = require("neo4j-driver");
const { exit } = require("process");
const { HOME_FOLDER_ID } = require("../shared/constants");

async function init() {
    const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "secret"));
    const session = driver.session({ defaultAccessMode: "WRITE" });

    await session.executeWrite((tx) => {
        tx.run(`
            CREATE CONSTRAINT FolderIdUnique
            IF NOT EXISTS
            FOR ( folder:Folder )
            REQUIRE folder.id IS UNIQUE
        `);
    });

    await session.executeWrite((tx) => {
        tx.run(`
            CREATE CONSTRAINT PageIdUnique
            IF NOT EXISTS
            FOR ( page:Page )
            REQUIRE page.id IS UNIQUE
        `);
    });

    await session.executeWrite((tx) => {
        tx.run(
            `
            CREATE ( folder:Folder { id: $id, name: $name, parentId: $parentId } )
        `,
            { id: HOME_FOLDER_ID, name: "Home", parentId: null }
        );
    });

    await session.close();
}

init()
    .then(() => console.log("completed successfully"))
    .catch((error) => console.error(error))
    .finally(() => exit());
