import { FC } from "react";
import { FormField } from "../useFormField";

type TextInputsProps = FormField<string>;

export const TextInput: FC<TextInputsProps> = ({ label, value, changeValue, validationError, onBlur, onFocus }) => {
    return (
        <label className="mt-4 block transition-all focus-within:text-fuchsia-500">
            <span>{label}</span>
            <input
                className="block w-full rounded-lg border border-slate-600 py-2 px-4 text-black outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-fuchsia-600"
                type="text"
                value={value}
                onChange={(e) => changeValue(e.currentTarget.value)}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            {validationError ? <span className="text-red-600">{validationError}</span> : null}
        </label>
    );
};
