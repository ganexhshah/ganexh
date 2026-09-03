import { PutObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID || "516d4d7c8a274b7f897979999bcb096b";
const accessKeyId = process.env.R2_ACCESS_KEY_ID || "80077dcf329a6b01c33e2c44b2b31e9b";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "506cbfc47728c0c24cb2756620e9936fcddd35f0ed9c633102454c6ddb86f2b4";
export const bucketName = process.env.R2_BUCKET_NAME || "protofilo";
export const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-1ccd4de4be1c4425b05bfbbde47ef4e5.r2.dev";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadToR2({
  file,
  fileName,
  contentType,
}: {
  file: Buffer | Uint8Array;
  fileName: string;
  contentType: string;
}) {
  const cleanFileName = `${Date.now()}-${fileName.replace(/\s+/g, "-")}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: cleanFileName,
    Body: file,
    ContentType: contentType,
  });

  await r2Client.send(command);

  return {
    key: cleanFileName,
    url: `${r2PublicUrl}/${cleanFileName}`,
  };
}

export async function deleteFromR2(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  return r2Client.send(command);
}

