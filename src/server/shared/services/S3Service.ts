import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import "@aws-sdk/signature-v4-crt";
import Redis from 'ioredis';


const s3Client = new S3Client({
    region: "us-east-1", // Use us-east-1 for multi-region access points
    useArnRegion: true,
    signingEscapePath: true
});

export const getImageFromS3 = async (key: string): Promise<Buffer> => {
    const bucketArn = process.env.AWS_MULTI_REGION_ACCESS_POINT_ARN;
    if (!bucketArn) {
        throw new Error('AWS_MULTI_REGION_ACCESS_POINT_ARN is not defined in environment variables');
    }


    const params = {
        Bucket: bucketArn,
        Key: key.startsWith('/') ? key.slice(1) : key,
    };

    try {
        const command = new GetObjectCommand(params);
        const response = await s3Client.send(command);


        if (!response.Body) {
            throw new Error('Empty response body');
        }

        return await streamToBuffer(response.Body as Readable);
    } catch (error: any) {
        if (error.$metadata && error.$metadata.httpStatusCode === 404) {
            throw new Error('Image not found');
        }
        console.error('Error fetching image from S3:', error);
        throw new Error('Internal Server Error');
    }
};

async function streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}