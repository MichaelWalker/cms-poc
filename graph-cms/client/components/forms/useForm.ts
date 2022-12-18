import { FormEvent, useEffect } from "react";
import { z } from "zod";
import { FormField } from "./useFormField";

type UseFormProps<T extends z.ZodRawShape> = {
    // TODO: is there a way to not rely on 'any'?
    fields: Record<keyof T, FormField<any>>;
    schema: z.ZodObject<T>;
};

type Form<T> = {
    handleSubmit: (event: FormEvent) => Promise<void>;
    tryValidateAndParse: () => T | null;
};

export function useForm<T extends z.ZodRawShape>({ fields, schema }: UseFormProps<T>): Form<T> {
    function formFields() {
        return Object.values(fields);
    }

    function handleError(error: z.ZodError) {
        for (const issue of error.issues) {
            const name = issue.path[0];

            if (name) {
                const field = fields[name];
                field?.setValidationError(issue.message);
            }
        }
    }

    function tryValidateAndParse(): T | null {
        let data = {} as Record<string, unknown>;
        for (const [name, field] of Object.entries(fields)) {
            data[name] = field.value;
        }

        const result = schema.safeParse(data);

        if (result.success) {
            return result.data as T;
        } else {
            handleError(result.error);
            return null;
        }
    }

    useEffect(() => {
        tryValidateAndParse();
    }, [formFields().map((field) => field.value)]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return {
        handleSubmit,
        tryValidateAndParse,
    };
}
