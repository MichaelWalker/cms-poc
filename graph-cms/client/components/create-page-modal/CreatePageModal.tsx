import { FC, useState } from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { trpc } from "graph-cms/client/trpc";
import { createPageRequest } from "graph-cms/shared/validations";
import { Modal } from "../modal/Modal";

type CreatePageModalProps = {
    folderId: string;
};

export const CreatePageModal: FC<CreatePageModalProps> = ({ folderId }) => {
    const createPageMutation = trpc.pages.create.useMutation();
    const trpcContext = trpc.useContext();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    async function handleSubmit() {
        const request = createPageRequest.parse({ name, url, folderId });
        await createPageMutation.mutateAsync(request, {
            onSuccess: () => {
                trpcContext.pages.findInFolder.invalidate({ folderId });
            },
        });

        setOpen(false);
    }

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            trigger={<SecondaryButton>+ create page</SecondaryButton>}
            title="Create Page"
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

                <label className="mb-8 block">
                    Url
                    <input
                        className="block w-full rounded-xl border border-black px-8 py-4 outline-none"
                        value={url}
                        onChange={(event) => setUrl(event.currentTarget.value)}
                    />
                </label>

                <PrimaryButton>Submit</PrimaryButton>
            </form>
        </Modal>
    );
};
