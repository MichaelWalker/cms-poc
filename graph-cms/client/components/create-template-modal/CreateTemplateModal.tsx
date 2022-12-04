import { FC, useState } from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { trpc } from "graph-cms/client/trpc";
import { createTemplateRequest } from "graph-cms/shared/validations";
import { Modal } from "../modal/Modal";

type CreateTemplateModalProps = {
    folderId: string;
};

export const CreateTemplateModal: FC<CreateTemplateModalProps> = ({ folderId }) => {
    const createTemplateMutation = trpc.templates.create.useMutation();
    const trpcContext = trpc.useContext();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    async function handleSubmit() {
        const request = createTemplateRequest.parse({ name, folderId });
        await createTemplateMutation.mutateAsync(request, {
            onSuccess: () => {
                trpcContext.templates.findInFolder.invalidate({ folderId });
            },
        });

        setOpen(false);
    }

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            trigger={<SecondaryButton>+ create template</SecondaryButton>}
            title="Create Template"
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
