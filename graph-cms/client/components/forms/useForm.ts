import { FormEvent } from "react";
import { z } from "zod";
import { FormField } from "./useFormField";

type UseFormProps<T extends z.ZodRawShape> = {
    fields: Record<keyof T, FormField<T[keyof T]>>;
    schema: z.ZodObject<T>;
    onSubmit: (data: T) => void | Promise<void>;
};

type Form = {
    handleSubmit: (event: FormEvent) => Promise<void>;
};

export function useForm<T extends z.ZodRawShape>({ fields, schema, onSubmit }: UseFormProps<T>): Form {
    function handleError(error: z.ZodError) {
        for (const issue of error.issues) {
            const name = issue.path[0];

            if (name) {
                const field = fields[name];
                field?.setValidationError(issue.message);
            }
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        let data = {} as Record<string, unknown>;
        for (const [name, field] of Object.entries(fields)) {
            data[name] = field.value;
        }

        const result = schema.safeParse(data);

        if (result.success) {
            await onSubmit(result.data as T);
        } else {
            handleError(result.error);
        }
    }

    return {
        handleSubmit,
    };
}
