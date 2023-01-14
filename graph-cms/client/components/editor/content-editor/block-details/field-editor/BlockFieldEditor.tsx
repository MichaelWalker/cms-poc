import { KeyboardFocusable } from "graph-cms/client/components/keyboard-focusable/KeyboardFocusable";
import { FieldNodeValue, HasFieldRelation } from "graph-cms/shared/domainTypes";
import { FieldDefinition } from "graph-cms/shared/fields";
import { FC, ReactElement } from "react";
import { useContentEditorContext } from "../../ContentEditor";

type BlockFieldEditorProps<T extends FieldNodeValue> = {
    fieldDefinition: FieldDefinition<T>;
    fieldRelation: HasFieldRelation;
};

export function BlockFieldEditor<T extends FieldNodeValue>({
    fieldRelation,
    fieldDefinition,
}: BlockFieldEditorProps<T>): ReactElement {
    const { goToCreateBlock, goToBlockDetails } = useContentEditorContext();

    if (fieldRelation.field.type !== "block") {
        throw new Error("BlockFieldEditor can only be used with block fields");
    }

    const block = fieldRelation.field.value?.block;

    if (!block || block.type === "placeholder") {
        return (
            <div className="mb-4">
                <span className="tracking-wider">{fieldDefinition.label}</span>
                {fieldDefinition.description ? <span>{fieldDefinition.description}</span> : null}
                <KeyboardFocusable>
                    <button
                        onClick={() => goToCreateBlock(fieldRelation.key, fieldRelation.field)}
                        className="block w-full rounded-lg border border-slate-600 py-4 px-8 text-left transition-colors hover:border-fuchsia-600 hover:bg-fuchsia-200"
                    >
                        Empty - click to add
                    </button>
                </KeyboardFocusable>
            </div>
        );
    }

    return (
        <div className="mb-4">
            <span className="tracking-wider">{fieldDefinition.label}</span>
            {fieldDefinition.description ? <span>{fieldDefinition.description}</span> : null}
            <KeyboardFocusable>
                <button
                    onClick={() => goToBlockDetails(fieldRelation.key, block, fieldRelation.field)}
                    className="block w-full rounded-lg border border-slate-600 py-4 px-8 text-left transition-colors hover:border-fuchsia-600 hover:bg-fuchsia-200"
                >
                    {block.type}
                </button>
            </KeyboardFocusable>
        </div>
    );
}
