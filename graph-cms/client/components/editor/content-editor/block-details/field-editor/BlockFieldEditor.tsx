import { FieldNodeValue, HasFieldRelation } from "graph-cms/shared/domainTypes";
import { FieldDefinition } from "graph-cms/shared/fields";
import { FC, ReactElement } from "react";

type BlockFieldEditorProps<T extends FieldNodeValue> = {
    fieldDefinition: FieldDefinition<T>;
    fieldRelation: HasFieldRelation;
};

export function BlockFieldEditor<T extends FieldNodeValue>({
    fieldRelation,
    fieldDefinition,
}: BlockFieldEditorProps<T>): ReactElement {
    if (fieldRelation.field.type !== "block") {
        throw new Error("BlockFieldEditor can only be used with block fields");
    }

    return (
        <div className="mb-4">
            <span className="tracking-wider">{fieldDefinition.label}</span>
            {fieldDefinition.description ? <span>{fieldDefinition.description}</span> : null}
            <div className="rounded-lg border border-slate-600 py-4 px-8">Empty - click to add</div>
        </div>
    );
}
