const TOKEN = "skFTQNY2PPHm4JFQR3c18q5HfNNDsYvVs8xTcb2p6qaSUupAFRy636iMTcxlJ6hkZgmV4TW8zACegV4oBblihBnKQAyqUGVL1OqLYIZNIgRbTqoxwmE4lBgH299mxDnzzz3zIQGSxFndlwl46Tfuqji8pUp31vv5jLxoDfpNzBeiOPcLeelH";
const q = encodeURIComponent('{"projects": count(*[_type=="project"]), "blogs": count(*[_type=="blog"]), "achievements": count(*[_type=="achievement"])}');

fetch(`https://97jei0ea.api.sanity.io/v2024-03-01/data/query/production?query=${q}`, {
  headers: { Authorization: `Bearer ${TOKEN}` }
})
.then(r => r.json())
.then(d => console.log("CURRENT SANITY CONTENT STATS:", d.result))
.catch(e => console.error(e));

