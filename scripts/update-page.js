const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const { version, name } = require('../package.json');
const signedFileName = `browser_extension_test-${version}-an+fx.xpi`;
const indexFilePath = path.resolve(__dirname, '../docs/index.html');
const indexFileContent = '' + fs.readFileSync(indexFilePath);
const $ = cheerio.load(indexFileContent);
const relBuildPath = `builds/firefox/versions/${signedFileName}`;

$('.download-ff')
  .attr('href', relBuildPath)
  .text(`Install v${version} for Firefox`);
const updatedFileContent = $.html();
fs.writeFileSync(indexFilePath, updatedFileContent);

console.log('Updated link in GitHub Pages');

const appId = require('../dist/firefox/manifest.json').browser_specific_settings.gecko.id;
const updatesJson = require('../docs/builds/firefox/updates.json') || {};
updatesJson.addons = updatesJson.addons || {};
updatesJson.addons[appId] = updatesJson.addons[appId] || {};
updatesJson.addons[appId].updates = updatesJson.addons[appId].updates || [];
updatesJson.addons[appId].updates.push({
  version,
  update_link: `https://matita.github.io/browser-extension-test/${relBuildPath}`
});
const updatesFilePath = path.resolve(__dirname, '../docs/builds/firefox/updates.json');
fs.writeFileSync(updatesFilePath, JSON.stringify(updatesJson));

console.log('Updated updates.json');
