import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const s3Client = new S3Client({
  region: process.env.REGION,

});

export const uploadToS3 = async (file, fileName) => {
  // Convert file to Buffer
  const buffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(buffer);

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: file.type,
  });

  try {
    await s3Client.send(command);
    return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

export const getSignedDownloadUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (error) {
    console.error("Error getting signed URL:", error);
    throw error;
  }
}; 