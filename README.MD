# Infinite Posts
A performant, infinite-scrolling social feed built with React, TypeScript, and Vite. Posts and comments are generated on the fly using [faker.js](https://fakerjs.dev), and avatars are rendered with [multiavatar](https://multiavatar.com/).

## Live Preview
Go to https://mmedoo.github.io/infinite-feed


## Features

- Infinite scroll loading of posts (with Web Worker offloading).
- Fake user, post, and comment data.
- Modal overlay for viewing post comments.
- Responsive, modern UI with CSS modules.
- React 19, TypeScript and Vite.

## Project Structure

```md
├── public/              # Static assets (SVGs, etc.)
├── src/
│   ├── App.tsx          # Main app component
│   ├── components/      # UI components (Post, Comments)
│   ├── workers/         # Web Worker and data generation logic
│   ├── types.ts         # TypeScript types
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── vite.config.ts
└── ...
```
## Credits

- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)
- [multiavatar](https://www.npmjs.com/package/@multiavatar/multiavatar)
