import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

export const uploadFile = async (file: any, fileName: string) => {
  const params: any = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
  };
  await s3.upload(params, function (err: any, data: any) {
    if (err) {
      throw err;
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  });
};

export const deleteFile = async (fileName: string) => {
  await s3
    .deleteObject({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
      Key: fileName,
    })
    .promise();
};

export const getFile = async (fileName: string) => {
  const file = await s3
    .getObject({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
      Key: fileName,
    })
    .promise();

  return file.Body;
};
