import { createClient } from "next-sanity";
import { projects } from "../src/data/projects.js";

const client = createClient({
  projectId: "97jei0ea",
  dataset: "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: "skFTQNY2PPHm4JFQR3c18q5HfNNDsYvVs8xTcb2p6qaSUupAFRy636iMTcxlJ6hkZgmV4TW8zACegV4oBblihBnKQAyqUGVL1OqLYIZNIgRbTqoxwmE4lBgH299mxDnzzz3zIQGSxFndlwl46Tfuqji8pUp31vv5jLxoDfpNzBeiOPcLeelH",
});

console.log("Seeding Sanity...");

