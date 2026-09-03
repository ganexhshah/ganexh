import fs from "fs";
import path from "path";

const PROJECT_ID = "97jei0ea";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const TOKEN = "skFTQNY2PPHm4JFQR3c18q5HfNNDsYvVs8xTcb2p6qaSUupAFRy636iMTcxlJ6hkZgmV4TW8zACegV4oBblihBnKQAyqUGVL1OqLYIZNIgRbTqoxwmE4lBgH299mxDnzzz3zIQGSxFndlwl46Tfuqji8pUp31vv5jLxoDfpNzBeiOPcLeelH";

const blogThumbnails = [
  { file: "public/blogs/thumb-1.jpg" },
  { file: "public/blogs/thumb-2.jpg" },
  { file: "public/blogs/thumb-3.jpg" },
];

async function uploadImage(filePath) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) return null;

  const fileData = fs.readFileSync(fullPath);
  const fileName = path.basename(filePath);

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION.replace(/^v/, "")}/assets/images/${DATASET}?filename=${encodeURIComponent(fileName)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "image/jpeg",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: fileData,
  });

  const data = await res.json();
  return data.document?._id || null;
}

async function run() {
  console.log("Uploading blog thumbnails to Sanity...");
  const uploaded = {};
  for (const item of blogThumbnails) {
    const id = await uploadImage(item.file);
    uploaded[item.file] = id;
    console.log(`Uploaded ${item.file} -> ${id}`);
  }

  // Get all blogs and link their coverImage
  const getUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION.replace(/^v/, "")}/data/query/${DATASET}?query=${encodeURIComponent('*[_type=="blog"]{ _id }')}`;
  const getRes = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  const blogs = (await getRes.json()).result || [];

  const assetIds = Object.values(uploaded).filter(Boolean);
  if (assetIds.length > 0) {
    const mutations = blogs.map((b, idx) => ({
      patch: {
        id: b._id,
        set: {
          coverImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: assetIds[idx % assetIds.length],
            },
          },
        },
      },
    }));

    const patchUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION.replace(/^v/, "")}/data/mutate/${DATASET}`;
    await fetch(patchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ mutations }),
    });
    console.log(`Linked cover images to all ${blogs.length} blogs!`);
  }
}

run();

