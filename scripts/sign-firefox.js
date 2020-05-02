require('dotenv').config();
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.resolve(__dirname, '../dist/firefox');
const artifactsDir = path.resolve(__dirname, '../docs/builds/firefox/versions');
const manifest = require('../dist/firefox/manifest.json');
const appId = manifest.browser_specific_settings.gecko.id;

execSync(
  `npx web-ext sign` +
  ` --source-dir=${sourceDir}` +
  ` --artifacts-dir=${artifactsDir}` +
  ` --api-key=${process.env.FIREFOX_API_KEY}` +
  ` --api-secret=${process.env.FIREFOX_API_SECRET}` +
  ` --id=${appId}`
, { stdio: 'inherit' });
