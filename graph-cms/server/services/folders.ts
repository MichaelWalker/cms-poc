import {
    GetFoldersInFolderResponse,
    GetPagesInFolderResponse,
    GetTemplatesInFolderResponse,
} from "graph-cms/shared/types/folderResponses";
import { GetFoldersInFolderRequest } from "graph-cms/shared/validations/folderValidation";
import * as folderRepo from "../repos/folderRepo";

export async function getFoldersInFolder({ folderId }: GetFoldersInFolderRequest): Promise<GetFoldersInFolderResponse> {
    const response = await folderRepo.getFoldersInFolder(folderId);
    return response.records.map((record) => record.get("child"));
}

export async function getPagesInFolder({ folderId }: GetFoldersInFolderRequest): Promise<GetPagesInFolderResponse> {
    const response = await folderRepo.getPagesInFolder(folderId);
    return response.records.map((record) => record.get("child"));
}

export async function getTemplatesInFolder({
    folderId,
}: GetFoldersInFolderRequest): Promise<GetTemplatesInFolderResponse> {
    const response = await folderRepo.getTemplatesInFolder(folderId);
    return response.records.map((record) => record.get("child"));
}
