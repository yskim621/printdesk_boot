const { nextI18NextRewrites } = require('next-i18next/rewrites');
const withImages = require('next-images');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const localeSubpaths = {};

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  const env = {
    SITE: (() => {
      if (isDev) return 'http://localhost:9999';
      if (isProd) return 'https://erp.printingworks.co.kr';
      if (isStaging) return 'http://localhost:9999';
      return 'SITE:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    API_ENDPOINT: (() => {
      if (isDev) return 'http://localhost:8081/api/v1';
      if (isProd) return 'https://erp.printingworks.co.kr/api';
      if (isStaging) return 'http://localhost:8081/api';
      return 'API_ENDPOINT:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
  };

  return withImages({
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
      localeSubpaths,
    },
    esModule: true,
    webpack: (config, options) => {
      return config;
    },
    env,
    redirects: async () => [
      { source: '/', destination: '/sys/user/list', permanent: true },
    ],
  });
};
