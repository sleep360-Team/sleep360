# sleep360

[Trello](https://trello.com/b/znyUeNsl)

## Configuring

The environment file needs to be configured to connect the app to the correct database. It contains 4 fields:

**DB_NAME** -- One of `sleep360` and `sleep360_test`
**DB_URL** -- The URL for the DB server. Currently `sleep360.csse.rose-hulman.edu`
**DB_USER** -- Username of the account used to connect to the DB server
**DB_PASS** -- Password of the account used to connect to the DB server

To deploy the app, you may need to configure a Svelte [adapter](https://kit.svelte.dev/docs/adapters) for your target environment. This is currently set to `@sveltejs/adapter-node` in `svelte.config.js`

## Developing

Before starting development on a fresh machine, execute:

```bash
npm install
```

To run a development server, execute:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Testing

To run all tests, execute:

```bash
npm test
```

To run individual tests, execute one of:

```bash
npm test:unit
#or
npm test:integration
```

## Building

To create a production build, execute:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```
