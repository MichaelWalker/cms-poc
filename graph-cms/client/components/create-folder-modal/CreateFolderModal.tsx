import { FC, useState } from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { trpc } from "graph-cms/client/trpc";
import { createFolderRequest } from "graph-cms/shared/validations";
import { Modal } from "../modal/Modal";

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
                trpcContext.folders.findInFolder.invalidate({ folderId: parentFolderId });
            },
        });

        setOpen(false);
    }

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            trigger={<SecondaryButton>+ create folder</SecondaryButton>}
            title="Create Folder"
        >
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
        </Modal>
    );
};
