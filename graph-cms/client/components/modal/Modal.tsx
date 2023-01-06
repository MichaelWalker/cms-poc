import * as Dialog from "@radix-ui/react-dialog";
import { FC, ReactElement } from "react";

type ModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    trigger: ReactElement;
    title: string;
    children: ReactElement;
};

export const Modal: FC<ModalProps> = ({ open, setOpen, trigger, title, children }) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <div>{trigger}</div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed top-0 bottom-0 right-0 left-0 bg-gray-200/70 backdrop-blur" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-12 font-['Poppins'] shadow">
                    <Dialog.Title className="mb-8 text-3xl text-black">{title}</Dialog.Title>
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
