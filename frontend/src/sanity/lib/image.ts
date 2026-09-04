import createImageUrlBuilder from "@sanity/image-url";
type ImageUrlBuilderParam = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: ImageUrlBuilderParam) => {
  return builder.image(source).auto("format").fit("max");
};
