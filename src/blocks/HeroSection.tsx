import { block } from "graph-cms";
import { imageField, textField } from "graph-cms/shared/fields";
import { FC } from "react";
import { z } from "zod";

const heroSectionSchema = z.object({
    imageSource: z.string().url(),
    imageAltText: z.string().trim().min(1),
    title: z.string().trim().min(1),
    description: z.string().optional(),
});

type HeroSectionProps = z.infer<typeof heroSectionSchema>;

const HeroSection: FC<HeroSectionProps> = ({ imageSource, imageAltText, title, description }) => {
    return (
        <section>
            <img src={imageSource} alt={imageAltText} />
            <h1>{title}</h1>
            {description ? <div>{description}</div> : null}
        </section>
    );
};

export const heroSectionBlock = block({
    type: "hero-section",
    schema: heroSectionSchema,
    component: HeroSection,
    fields: {
        imageSource: imageField({ label: "Image Source" }),
        imageAltText: textField({ label: "Image Alt Text" }),
        title: textField({ label: "Title" }),
        description: textField({ label: "Description" }),
    },
});
