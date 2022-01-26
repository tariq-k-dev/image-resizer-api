import express from 'express';
import fs from 'fs';
import path from 'path';
import imgResize from '../utilities/sharp-resize';
import rateLimit from 'express-rate-limit';

const routes = express.Router();

// set up rate limiter: maximum of five requests per minute
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

routes.get('/', limiter);

/* GET home page. */
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.sendFile(path.resolve(path.join('dist', 'views', 'index.html')));
});

routes.get(
  '/css/style.css',
  (req: express.Request, res: express.Response): void => {
    res.sendFile(path.resolve(path.join('dist', 'views', 'css', 'style.css')));
  }
);

routes.get(
  '/api/images',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename: string = req.query.filename as string;
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
        const thumbImgPath = path.join(
          'dist',
          'assets',
          'thumb',
          filename + '_thumb_' + imgWidth + '_' + imgHeight + '.' + fileExt
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
