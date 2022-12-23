import { useState } from "react";

export type FormField<T> = {
    label: string;
    value: T | undefined;
    changeValue: (value: T) => void;
    validationError: string | null;
    setValidationError: (error: string) => void;
    onBlur: () => void;
    onFocus: () => void;
};

type UseFormFieldProps<T> = {
    label: string;
    initialValue?: T;
};

export function useFormField<T>({ label, initialValue }: UseFormFieldProps<T>): FormField<T> {
    const [value, setValue] = useState<T | undefined>(initialValue);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [showValidationError, setShowValidationError] = useState(false);

    function changeValue(value: T) {
        setValidationError(null);
        setShowValidationError(false);
        setValue(value);
    }

    function onFocus() {
        // do nothing.
    }

    function onBlur() {
        setShowValidationError(true);
    }

    return {
        label,
        value,
        changeValue,
        validationError: showValidationError ? validationError : null,
        setValidationError,
        onBlur,
        onFocus,
    };
}
