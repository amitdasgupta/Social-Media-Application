const saltedMd5 = require('salted-md5');
const path = require('path');
const { bucket } = require('./firebase');

module.exports = {
  uploadImageAndGivePath: function (file) {
    return new Promise((resolve, reject) => {
      const name = saltedMd5(file.originalname, process.env.imageNameSalt);
      const fileName = name + path.extname(file.originalname);
      // const fileBlob = bucket.file(fileName);
      // await fileToBeUploaded.createWriteStream().end(file.buffer);

      const blob = bucket.file(fileName);

      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          public: true,
        },
      });

      blobWriter.on('error', reject);

      blobWriter.on('finish', async () => {
        await blob.makePublic();
        const [metaData] = await blob.getMetadata();
        // const url = metadata.mediaLink;
        const { mediaLink: uploadedLink } = metaData;
        resolve(uploadedLink);
      });

      blobWriter.end(file.buffer);
    });
  },
};
