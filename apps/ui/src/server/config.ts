import { AuthMethod, Mode, NodeEnv } from '@not-govuk/engine';
import commonConfig from '../common/config';

const env = process.env.NODE_ENV as NodeEnv;
const devMode = env === NodeEnv.Development;
const stagingEnvironment = process.env.ENVIRONMENT || 'dev';
const dummyRoles = [
  'dev',
  'preview',
  'birth',
  'death',
  'marriage',
  'full-details'
];

const defaultsFalse = (v: string): boolean => (v || '').match(/(true|yes|on)/i) !== null;
const defaultsTrue = (v: string): boolean => (v || '').match(/(false|no|off)/i) === null;

const serverConfig = {
  ...commonConfig,
  auth: {
    method: process.env.AUTH_METHOD || ( devMode ? AuthMethod.Dummy : AuthMethod.OIDC ),
    sessionsSecret: process.env.SESSIONS_SECRET || 'changeme',
    dummy: {
      username: 'TestUser',
      groups: [],
      roles: dummyRoles
    },
    headers: {
      usernameHeader: process.env.AUTH_HEADER_USERNAME || 'x-auth-username',
      groupsHeader: process.env.AUTH_HEADER_GROUPS || 'x-auth-groups',
      rolesHeader: process.env.AUTH_HEADER_ROLES || 'x-auth-roles'
    },
    basic: {
      username: process.env.AUTH_USERNAME || 'guest',
      password: process.env.AUTH_PASSWORD || 'password',
      roles: dummyRoles,
    },
    oidc: {
      issuer: process.env.OIDC_ISSUER || 'https://sso-dev.notprod.homeoffice.gov.uk/auth/realms/lev/',
      clientId: process.env.OIDC_CLIENT_ID || 'local-dev',
      clientSecret: process.env.OIDC_CLIENT_SECRET,
      redirectUri: process.env.OIDC_REDIRECT_URI || 'http://localhost:8080'
    }
  },
  api: {
    host: process.env.API_HOST || (!devMode && `api.${stagingEnvironment}.notprod.lev.homeoffice.gov.uk`),
    port: Number(process.env.API_PORT) || 443,
    tlsVerify: defaultsTrue(process.env.API_TLS_VERIFY)
  },
  env,
  httpd: {
    host: process.env.LISTEN_HOST || '0.0.0.0',
    port: Number(process.env.LISTEN_PORT) || 8080
  },
  mode: (process.env.MODE || 'server') as Mode,
  privacy: !!(process.env.PRIVACY && process.env.PRIVACY.match(/(yes|true)/i)),
  requiredRoles: [ stagingEnvironment, 'preview' ],
  ssrOnly: !!(process.env.SSR_ONLY && process.env.SSR_ONLY.match(/(yes|true)/i))
};

export default serverConfig;
