require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const cheerio = require('cheerio');

const { version } = require('../package.json');
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

const signedFileName = `browser-extension-test-${version}-an+fx.xpi`;
const indexFilePath = path.resolve(__dirname, '../docs/index.html');
const indexFileContent = '' + fs.readFileSync(indexFilePath);
const $ = cheerio.load(indexFileContent);
$('.download-ff')
  .attr('href', `builds/firefox/versions/${signedFileName}`)
  .text(`Install v${version} for Firefox`);
const updatedFileContent = $.html();
fs.readFileSync(indexFilePath, updatedFileContent);
console.log('Updated link in GitHub Pages');
