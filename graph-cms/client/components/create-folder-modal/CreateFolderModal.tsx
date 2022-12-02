import { FC, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type CreateFolderModalProps = {
    parentFolderId: string;
};

export const CreateFolderModal: FC<CreateFolderModalProps> = ({}) => {
    const [open, setOpen] = useState(false);

    function close() {
        setOpen(false);
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button>Create Folder</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed top-0 bottom-0 right-0 left-0 bg-gradient-to-tl from-slate-900/90  via-slate-900/90 to-fuchsia-900/90" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-800 p-12 font-['Poppins'] shadow shadow-slate-600">
                    <Dialog.Title className="text-3xl text-slate-50">Create Folder</Dialog.Title>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
