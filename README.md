# Image Resizer API

This a Node.js, Express, Typescript project that can take an existing image from `dist/assets/full` image folder and resize it using the Sharp module.  Jasmine is used for unit testing.  The image is resized based on the image filename, width, and height parameters in `/api/images?filename=x&width=y&height=z` route.

To use the API locally git clone the project or download the zip folder, and run `npm install` to install the project dependencies.

### Linting using Eslint with Typescript

```bash
npm run lint
```

### Code formatting with Prettier

```bash
npm run prettier
```

###  Production build using the TypeScript Compiler

```bash
npm run build
```

### Unit Test with Jasmine

```bash
npm run test
```

### To Run the Dev Server with Nodemon

```bash
npm run dev
```

### To Run the Production Server

```bash
npm start
```



### Use the following URL pattern to resize a demo image

**Note**: Please substitute whatever whole numbers you wish for the images width and height in pixels

[https://image-resize-api.herokuapp.com/api/images?filename=fjord&width=600&height=480](https://image-resize-api.herokuapp.com/api/images?filename=fjord&width=600&height=480)

