# Pool Dashboard

A Nimiq mining pool website with a stats page and dashboard for miners to check their hashrate and pool balance.

Made for Nimiq Mining Pools that use [the official pool implementation](https://github.com/nimiq/mining-pool).

## Configuration

To use this dashboard for your pool, you need to change a couple of files before building:

### `.env`

This file contains relevant settings of your pool, so that the website can connect to your database, generate statistics and generate miner dashboards.

**Database:** If you are running with a non-standard MySQL database, username or hostname, you must adapt the `DB_*` settings in this file to your server configuration.

**Pool Data:** For the website to display your pool name, description and mining-fee, you must adapt the `POOL_*`settings to your pool configuration.

### `static/manifest.json`

For the PWA install prompt and the homescreen icon to show your pool name, you must adapt the `name` and `short_name` fields in this file.

### `favicon.ico` and PWA icons

Replace `static/favicon.ico`, `static/logo-192.png` and `static/logo-512.png` with the logo of your pool. Make sure to keep the pixel sizes of the images.

## Build

After you changed the above files, you need to install the dependencies and build the project:

```bash
yarn install # or `npm install`
yarn build # or `npm run build`
```

## Deployment

Start the webserver directly:

```bash
yarn start # or `npm run start`
```

To run with PM2:

```bash
pm2 start /path/to/pool-dashboard/__sapper__/build --cmd /path/to/pool-dashboard
```

By default, the server is listening on port `3000`. To change this, set the environment variable `PORT` or hard-code the port in `src/server.js`.

## Development

This is a [Sapper](https://sapper.svelte.dev) project, so please read the Sapper docs for details.

This project additionally uses [TailwindCSS](https://tailwindcss.com) for styling, so to start a development environment, you need to run these two commands in two different terminal instances:

```bash
yarn dev # or `npm run dev`
```

```bash
yarn watch:tailwind # or `npm run watch:tailwind`
```
