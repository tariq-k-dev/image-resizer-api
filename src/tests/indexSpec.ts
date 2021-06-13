import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('gets /api/images?filename=fjord&width=600&height=480 with status 200', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=600&height=480'
    );

    expect(response.status).toBe(200);
  });
});

describe('Sharp Image Resize Test', () => {
  it('Request to /api/images?filename=fjord&width=100&height=100 creates 100x100 thumbnail image', async () => {
    await request.get('/api/images?filename=fjord&width=100&height=100');
    const pathToThumb = path.join(
      'dist',
      'assets',
      'thumb',
      'fjord_thumb_100_100.jpg'
    );
    const imgThumbExist = fs.existsSync(pathToThumb);

    expect(imgThumbExist).toBeTrue();
  });
});
