import { tv } from "tailwind-variants";

const fieldVariants = tv({
  slots: {
    fieldset: "",
    legend: "",
    fieldGroup: "group/field-group flex w-full flex-col gap-5",
    field: "flex w-full flex-col gap-2",
    fieldContent: "flex flex-col gap-1",
    label: "text-sm",
    description: "text-sm text-fg-muted",
    fieldError: "text-sm text-fg-danger",
  },
});

export { fieldVariants };
