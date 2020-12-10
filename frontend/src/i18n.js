const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

module.exports = new NextI18Next({
  browserLanguageDetection: false,
  // serverLanguageDetection: false,
  // defaultLanguage: 'ko',
  otherLanguages: ['ko', 'cn', 'en'],
  localeSubpaths,
  fallbackLng: 'ko',
  localePath: path.resolve('./public/locales'),
});
