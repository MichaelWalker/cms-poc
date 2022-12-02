import { FC, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { trpc } from "graph-cms/client/trpc";
import { createFolderRequest } from "graph-cms/shared/validations/folderValidation";

type CreateFolderModalProps = {
    parentFolderId: string;
};

export const CreateFolderModal: FC<CreateFolderModalProps> = ({ parentFolderId }) => {
    const createFolderMutation = trpc.folders.create.useMutation();
    const trpcContext = trpc.useContext();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    async function handleSubmit() {
        const request = createFolderRequest.parse({ name, parentId: parentFolderId });
        await createFolderMutation.mutateAsync(request, {
            onSuccess: () => {
                trpcContext.folders.getFoldersInFolder.invalidate({ folderId: parentFolderId });
            },
        });

        setOpen(false);
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <div>
                    <SecondaryButton>+ create folder</SecondaryButton>
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed top-0 bottom-0 right-0 left-0 bg-gradient-to-br from-orange-200/80  via-stone-100/80 to-fuchsia-200/80" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-12 font-['Poppins'] shadow">
                    <Dialog.Title className="mb-8 text-3xl text-black">Create Folder</Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <label className="mb-8 block">
                            Name
                            <input
                                className="block w-full rounded-xl border border-black px-8 py-4 outline-none"
                                value={name}
                                onChange={(event) => setName(event.currentTarget.value)}
                            />
                        </label>

                        <PrimaryButton>Submit</PrimaryButton>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
