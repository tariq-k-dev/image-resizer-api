import express from 'express';
import fs from 'fs';
import path from 'path';
import imgResize from '../utilities/sharp-resize';
import limiter from '../utilities/rateLimiter';
import sanitize from 'sanitize-filename';

const routes = express.Router();

/* GET home page. */
routes.get(
  '/',
  limiter,
  (req: express.Request, res: express.Response): void => {
    res.sendFile(path.resolve(path.join('dist', 'views', 'index.html')));
  }
);

routes.get(
  '/css/style.css',
  limiter,
  (req: express.Request, res: express.Response): void => {
    res.sendFile(path.resolve(path.join('dist', 'views', 'css', 'style.css')));
  }
);

routes.get(
  '/api/images',
  limiter,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename: string = sanitize(req.query.filename as string);
    const imgWidth: number = parseInt(req.query.width as string);
    const imgHeight: number = parseInt(req.query.height as string);
    const fullImgPath: string = path.join('dist', 'assets', 'full');

    try {
      const fullImages: string[] = fs.readdirSync(fullImgPath);
      const matchingImg: string = fullImages.filter((img) =>
        img.includes(filename)
      )[0];

      if (matchingImg) {
        const fileExt: string = matchingImg.split('.').slice(-1)[0];
        const imgInfo = {
          filename,
          imgWidth,
          imgHeight,
          fileExt,
        };
        const thumbImgPath = sanitize(
          path.join(
            'dist',
            'assets',
            'thumb',
            filename + '_thumb_' + imgWidth + '_' + imgHeight + '.' + fileExt
          )
        );

        // check if image is already cached
        const imgCached = fs.existsSync(thumbImgPath);

        if (!imgCached) {
          try {
            await imgResize(imgInfo);
          } catch (err: unknown) {
            console.error('Image resize:', err);
          }
          res.sendFile(path.resolve(thumbImgPath));
        } else {
          res.sendFile(path.resolve(thumbImgPath));
        }
      }
    } catch (err: unknown) {
      console.log('Attempted to read full images folder:', err);
    }
  }
);

export default routes;
