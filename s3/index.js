const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

// function upload a file to S3 to save it in the bucket
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

//download file to S3 to stream it from this API

function getFileStream(fileKey) {
    const downloadParams = {
        Key : fileKey,
        Bucket: bucketName,
    }

    return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;