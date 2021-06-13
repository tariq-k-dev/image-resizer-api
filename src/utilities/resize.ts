// Create a pipeline that will download an image, resize it and format it to different files
// Using Promises to know when the pipeline is complete
import fs from 'fs';
import got from 'got';
import sharp from 'sharp';
const sharpStream = sharp({
  failOnError: false,
});

const promises = [];

promises.push(
  sharpStream.clone().jpeg({ quality: 100 }).toFile('originalFile.jpg')
);

promises.push(
  sharpStream
    .clone()
    .resize({ width: 500 })
    .jpeg({ quality: 80 })
    .toFile('optimized-500.jpg')
);

promises.push(
  sharpStream
    .clone()
    .resize({ width: 500 })
    .webp({ quality: 80 })
    .toFile('optimized-500.webp')
);

// https://github.com/sindresorhus/got#gotstreamurl-options
got.stream('https://www.example.com/some-file.jpg').pipe(sharpStream);

Promise.all(promises)
  .then((res) => {
    console.log('Done!', res);
  })
  .catch((err) => {
    console.error(`Error processing files, let's clean it up: ${err}`);
    try {
      fs.unlinkSync('originalFile.jpg');
      fs.unlinkSync('optimized-500.jpg');
      fs.unlinkSync('optimized-500.webp');
    } catch (e) {
      console.error(e);
    }
  });
