import { NextApiRequest, NextApiResponse } from "next";

export async function apiHandler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    response.json({ message: "hello world" });
}
