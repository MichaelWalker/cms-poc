import { useState } from "react";

export type FormField<T> = {
    label: string;
    value: T | undefined;
    setValue: (value: T) => void;
    validationError: string | null;
    setValidationError: (error: string) => void;
    clearValidationError: () => void;
};

type UseFormFieldProps<T> = {
    label: string;
    initialValue?: T;
};

export function useFormField<T>({ label, initialValue }: UseFormFieldProps<T>): FormField<T> {
    const [value, setValue] = useState<T | undefined>(initialValue);
    const [validationError, setValidationError] = useState<string | null>(null);

    function clearValidationError() {
        setValidationError(null);
    }

    return {
        label,
        value,
        setValue,
        validationError,
        setValidationError,
        clearValidationError,
    };
}
