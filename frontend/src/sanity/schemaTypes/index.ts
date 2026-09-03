import { type SchemaTypeDefinition } from "sanity";

import { achievementType } from "./achievement";
import { blogType } from "./blog";
import { projectType } from "./project";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, blogType, achievementType],
};

