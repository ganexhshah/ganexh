import { tv } from "tailwind-variants";

const fieldVariants = tv({
  slots: {
    field: "flex w-full flex-col gap-2",
  },
});

export function useStyles() {
  return fieldVariants;
}

export { fieldVariants };
