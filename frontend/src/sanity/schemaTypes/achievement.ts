import { defineField, defineType } from "sanity";

export const achievementType = defineType({
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date / Year",
      type: "string",
    }),
    defineField({
      name: "organization",
      title: "Issuing Organization",
      type: "string",
    }),
    defineField({
      name: "certificateImage",
      title: "Certificate / Proof Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "link",
      title: "External Link / Credential URL",
      type: "url",
    }),
  ],
});

