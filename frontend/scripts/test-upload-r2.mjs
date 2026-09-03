import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: "https://516d4d7c8a274b7f897979999bcb096b.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "80077dcf329a6b01c33e2c44b2b31e9b",
    secretAccessKey: "506cbfc47728c0c24cb2756620e9936fcddd35f0ed9c633102454c6ddb86f2b4",
  },
});

async function testUpload() {
  try {
    const cmd = new PutObjectCommand({
      Bucket: "protofilo",
      Key: "welcome.txt",
      Body: "Hello from Ganesh Shah Portfolio on Cloudflare R2!",
      ContentType: "text/plain",
    });
    await client.send(cmd);
    console.log("SUCCESS! Test file uploaded to R2 bucket 'protofilo' as 'welcome.txt'!");
    console.log("Public URL:", "https://pub-1ccd4de4be1c4425b05bfbbde47ef4e5.r2.dev/welcome.txt");
  } catch (err) {
    console.error("Upload error:", err.message);
  }
}

testUpload();

