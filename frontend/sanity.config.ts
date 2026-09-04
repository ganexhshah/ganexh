"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  name: "default",
  title: "Ganesh Shah Portfolio CMS",
  projectId: "97jei0ea",
  dataset: "production",
  schema,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: "2024-03-01" }),
  ],
});

