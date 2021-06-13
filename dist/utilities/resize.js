"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Create a pipeline that will download an image, resize it and format it to different files
// Using Promises to know when the pipeline is complete
var fs_1 = __importDefault(require("fs"));
var got_1 = __importDefault(require("got"));
var sharp_1 = __importDefault(require("sharp"));
var sharpStream = sharp_1.default({
    failOnError: false,
});
var promises = [];
promises.push(sharpStream.clone().jpeg({ quality: 100 }).toFile('originalFile.jpg'));
promises.push(sharpStream
    .clone()
    .resize({ width: 500 })
    .jpeg({ quality: 80 })
    .toFile('optimized-500.jpg'));
promises.push(sharpStream
    .clone()
    .resize({ width: 500 })
    .webp({ quality: 80 })
    .toFile('optimized-500.webp'));
// https://github.com/sindresorhus/got#gotstreamurl-options
got_1.default.stream('https://www.example.com/some-file.jpg').pipe(sharpStream);
Promise.all(promises)
    .then(function (res) {
    console.log('Done!', res);
})
    .catch(function (err) {
    console.error("Error processing files, let's clean it up: " + err);
    try {
        fs_1.default.unlinkSync('originalFile.jpg');
        fs_1.default.unlinkSync('optimized-500.jpg');
        fs_1.default.unlinkSync('optimized-500.webp');
    }
    catch (e) {
        console.error(e);
    }
});
