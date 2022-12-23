import { useState } from "react";

type UseStableStateResult<T> = [state: T, setState: (s: T) => void];

export function useStableState<T>(initialValue: T): UseStableStateResult<T> {
    const [state, setState] = useState(initialValue);

    function setStateIfChanged(value: T) {
        if (JSON.stringify(value) !== JSON.stringify(state)) {
            setState(value);
        }
    }

    return [state, setStateIfChanged];
}
