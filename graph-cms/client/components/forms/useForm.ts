import { useStableState } from "graph-cms/client/utils/use-stable-state";
import { InferredZodSchema } from "graph-cms/shared/type-utils";
import { useCallback, useEffect, useMemo } from "react";
import { ZodError } from "zod";
import { FormField } from "./useFormField";

type InferredFields<T extends {}> = {
    [K in keyof T]: FormField<T[K]>;
};

type UseFormProps<T extends {}> = {
    fields: InferredFields<T>;
    schema: InferredZodSchema<T>;
};

type FormState<T> = { isValid: false } | { isValid: true; data: T };

export function useForm<T extends {}>({ fields, schema }: UseFormProps<T>): FormState<T> {
    const [state, setState] = useStableState<FormState<T>>({ isValid: false });

    const handleError = useCallback(
        (error: ZodError) => {
            for (const issue of error.issues) {
                const name = issue.path[0] as keyof T | undefined;

                if (name) {
                    const field = fields[name];
                    field?.setValidationError(issue.message);
                }
            }
        },
        [fields]
    );

    const data = useMemo((): Partial<T> => {
        let data = {} as Partial<T>;

        for (const [name, field] of Object.entries(fields) as [keyof T, FormField<T[keyof T]>][]) {
            data[name] = field.value;
        }

        return data;
    }, [fields]);

    useEffect(() => {
        const result = schema.safeParse(data);

        if (result.success) {
            setState({ isValid: true, data: result.data as T });
        } else {
            handleError(result.error);
            setState({ isValid: false });
        }
    }, [data, handleError, schema]);

    return state;
}
