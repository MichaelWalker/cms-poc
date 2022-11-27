import { GetFoldersInFolderResponse } from "graph-cms/shared/types/folderResponses";
import { GetFoldersInFolderRequest } from "graph-cms/shared/validations/folderValidation";
import * as folderRepo from "../repos/folderRepo";

export async function getFoldersInFolder({ folderId }: GetFoldersInFolderRequest): Promise<GetFoldersInFolderResponse> {
    const response = await folderRepo.getFoldersInFolder(folderId);
    return response.records.map((record) => record.get("child"));
}
