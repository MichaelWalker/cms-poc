import { FormEvent } from "react";

export function preventDefault(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
}
