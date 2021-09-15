LEV - User Interface
====================

User interface prototype.


Usage
=====

This application can be configured using the following environment variables:

- **`LISTEN_HOST`** (default: `0.0.0.0`)
  The hostname to bind to.
- **`LISTEN_PORT`** (default: `8080`)
  The port to listen on.
- **`ENVIRONMENT`** (default: `dev`)
  The name of the staging environment.
- **`API_HOST`** (default: `api.${ENVIRONMENT}.notprod.lev.homeoffice.gov.uk`)
  The hostname for the instance of LEV API you wish to access.
- **`API_PORT`** (default: `443`)
  The port on which to access the API.
- **`API_TLS_VERIFY`** (default: `true`)
  Whether to verify the API's TLS certificate.
- **`SSR_ONLY`** (default: `false`)
  Whether to render only on the server. Normally rendering will be isomorphic /
  universal. i.e. The application will be rendered first on the server and then
  the client will take over if possible. Server rendering alone may offer better
  accessibility at the expense of UX in general.
- **`SESSIONS_SECRET`** (default: `changeme`)
  A secret used for encrypting the cookie(s) that hold the users session. This
  should be set to a random string and managed as a secret in order to prevent
  bad actors from decrypting the session data.
- **`AUTH_METHOD`** (default: `oidc`)
  The method to use for authentication. Options include:
  - `oidc`: OpenID Connect
  - `headers`: Blindly accept authentication from upstream HTTP headers. You
    must be running behind an authentication proxy for this to be at all secure.
  - `dummy`: Dummy authentication based on hard-coded configuration. Insecure.
- **`OIDC_ISSUER`** (default: `https://sso-dev.notprod.homeoffice.gov.uk/auth/realms/lev/`)
  URL for the issuer of tokens when using OpenID Connect for authentication.
- **`OIDC_CLIENT_ID`** (default: `local-dev`)
  The client ID to use with OpenID connect.
- **`OIDC_CLIENT_SECRET`**
  The client secret to use with OpenID Connect. Required for 'confidential'
  Keycloak clients. You should use this wherever possible and definitely in
  production.
- **`OIDC_REDIRECT_URI`** (default: `http://localhost:8080`)
  The URI that the OIDC issuer should redirect back to. This should be the
  public address of your service.
- **`AUTH_HEADER_USERNAME`** (default: `x-auth-username`)
  The request header from which to accept the username when using HTTP header
  "authentication".
- **`AUTH_HEADER_GROUPS`** (default: `x-auth-groups`)
  The request header from which to accept the user's groups when using HTTP
  header "authentication".
- **`AUTH_HEADER_ROLES`** (default: `x-auth-roles`)
  The request header from which to accept the user's roles when using HTTP
  header "authentication".

**Note:** You should ensure that you configure `SESSIONS_SECRET` in production.


Welcome to your new isomorphic React application
------------------------------------------------

To get started simply run `npm install` followed by:

```shell
npm run dev
```

Then visit http://localhost:8080 .

The website design can be modified in the `src/common/page-wrap.tsx`
file and individual pages can be added, removed and modified in the
`src/common/pages/` directory.

Should you wish, the meta-data for the HTML can be modified in the
`src/server/template.tsx` file.


How it works
------------

An HTTP server is started that serves Server-Side Rendered (SSR) React
pages as well as static assets built by webpack. The pages are defined
by files in the `src/common/pages/` directory (similar to [Next.js]) and
are wrapped by an application, allowing you to provide a uniform look
and feel to your website.

The pages served link to a JavaScript 'bundle' built by webpack that
'hydrates' the website once it is loaded, allowing for an enhanced user
experience on clients that can support it.

Testing
------------

e2e tests using Cypress can be run after starting the application, with:

`npm test`

Notable files and directories
-----------------------------

- `dist/`: Directory containing compiled versions of source code and assets.
- `src/client/`: Source code that is only run on the client.
- `src/client/index.ts`: The entry-point for the client-side bundle.
- `src/common/`: Source code that is run on both the client and the server.
- `src/common/page-wrap.tsx`: The React component that wraps the pages and accepts a `routes` array via its props that can be used for building in navigation.
- `src/common/page-loader.ts`: Boiler-plate for dynamically importing the pages. You shouldn't need to modify this unless you change the location of the pages.
- `src/common/pages/`: Directory containing the pages available on your website.
- `src/common/pages/index.tsx`: The 'home page' for your website.
- `src/server/`: Source code that is only run on the server.
- `src/server/config.ts`: Configuration for the server.
- `src/server/index.ts`: The entry-point for the server.
- `src/server/template.tsx`: The HTML wrapper served by the HTTP server.
- `webpack.config.js`: The webpack config file used to build the static assets including the bundle.
