import 'zone.js/node'; // Required for Angular Universal
import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server'; // Use the default export

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from the browser distribution folder
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
    })
  );

  // All regular routes use the Angular rendering engine
  server.get('*', (req, res, next) => {
    const { originalUrl, baseUrl } = req;

    renderApplication(bootstrap, {
      document: indexHtml,
      url: originalUrl,
      platformProviders: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
      .then((html: string) => res.status(200).send(html))
      .catch((err: Error) => {
        console.error('Error during rendering:', err);
        res.status(500).send('Internal server error');
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
