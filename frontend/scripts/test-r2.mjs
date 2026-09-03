import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: "https://516d4d7c8a274b7f897979999bcb096b.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "80077dcf329a6b01c33e2c44b2b31e9b",
    secretAccessKey: "506cbfc47728c0c24cb2756620e9936fcddd35f0ed9c633102454c6ddb86f2b4",
  },
});

async function testR2() {
  try {
    const cmd = new ListObjectsV2Command({
      Bucket: "protofilo",
    });
    const res = await client.send(cmd);
    console.log("SUCCESS! Connected to Cloudflare R2 bucket 'protofilo'!");
    console.log("Existing objects count in bucket:", res.KeyCount || 0);
  } catch (err) {
    console.error("Cloudflare R2 Connection Error:", err.message);
  }
}

testR2();

