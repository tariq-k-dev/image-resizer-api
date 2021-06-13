// import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgResize = async (imageInfo: {
  filename: string;
  imgWidth: number;
  imgHeight: number;
  fileExt: string;
}): Promise<void> => {
  const { filename, imgWidth, imgHeight, fileExt } = imageInfo;
  const fullImgPath = path.join(
    'dist',
    'assets',
    'full',
    filename + '.' + fileExt
  );
  const thumbImgPath = path.join(
    'dist',
    'assets',
    'thumb',
    filename + '_thumb_' + imgWidth + '_' + imgHeight + '.' + fileExt
  );

  await sharp(fullImgPath).resize(imgWidth, imgHeight).toFile(thumbImgPath);
};

export default imgResize;
