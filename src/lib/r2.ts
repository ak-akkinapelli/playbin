import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const r2Config = {
  accountId: process.env.NEXT_PUBLIC_R2_ACCOUNT_ID!,
  accessKeyId: process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY!,
  bucketName: "songs",
  publicUrl: "https://pub-2f2d28caa46445a1a656df0be3c543a0.r2.dev",
};

// Initialize Cloudflare R2 Client
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${r2Config.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: r2Config.accessKeyId,
    secretAccessKey: r2Config.secretAccessKey,
  },
});

export async function fetchAllSongsFromR2() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: r2Config.bucketName,
    });

    const response = await r2Client.send(command);
    if (!response.Contents) return [];

   return response.Contents.map((file, index) => ({
  id: index + 1,
  name: file.Key ?? "Unknown",
  url: `${r2Config.publicUrl}/${encodeURIComponent(file.Key ?? '')}`, 
  size: file.Size || 0,
}));
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
}

