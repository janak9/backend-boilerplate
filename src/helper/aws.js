import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const S3 = new AWS.S3();

const remove_s3_object = (key) => {
  if (!key) return;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return S3.deleteObject(params).promise();
};

/**
 * check that location is valid lat and lng
 *
 * @param objects [{Key: filePath}] required
 * @returns promise
 */
const remove_multiple_s3_objects = (objects) => {
  if (!objects) return;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: objects
    }
  };
  return S3.deleteObjects(params).promise();
};

const get_files_recursively = (param, cb, files = null, token = null) => {
  if (!files) files = [];
  if (token) param.ContinuationToken = token;

  S3.listObjectsV2(param, function(err, data){
    files = files.concat(data.Contents);

    if(data.IsTruncated)
      get_files_recursively(param, filescb, files, data.NextContinuationToken,);
    else
      cb(files);
  });
}

export {
  AWS,
  S3,
  remove_s3_object,
  remove_multiple_s3_objects,
  get_files_recursively,
}