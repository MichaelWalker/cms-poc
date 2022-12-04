import { ManagedTransaction } from "neo4j-driver";
import neo4j, { Driver } from "neo4j-driver";

let driver: Driver | undefined;
type ManagedTransactionWork<T> = (tx: ManagedTransaction) => Promise<T> | T;

function getDriver(): Driver {
    if (!driver) {
        driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "secret"));
    }

    return driver;
}

export async function write<T>(transactionWork: ManagedTransactionWork<T>): Promise<T> {
    const session = getDriver().session({ defaultAccessMode: "WRITE" });

    try {
        return await session.executeWrite(transactionWork);
    } finally {
        await session.close();
    }
}

export async function read<T>(transactionWork: ManagedTransactionWork<T>): Promise<T> {
    const session = getDriver().session({ defaultAccessMode: "READ" });

    try {
        return await session.executeRead(transactionWork);
    } finally {
        await session.close();
    }
}

export function singleOrThrow<T>(results: T[]): T {
    if (results && results[0] && results.length === 1) {
        return results[0];
    }

    throw `expected to find exactly 1 result, but found ${results.length}`;
}
