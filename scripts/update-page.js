const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const { version } = require('../package.json');
const signedFileName = `browser_extension_test-${version}-an+fx.xpi`;
const indexFilePath = path.resolve(__dirname, '../docs/index.html');
const indexFileContent = '' + fs.readFileSync(indexFilePath);
const $ = cheerio.load(indexFileContent);

$('.download-ff')
  .attr('href', `builds/firefox/versions/${signedFileName}`)
  .text(`Install v${version} for Firefox`);
const updatedFileContent = $.html();
fs.writeFileSync(indexFilePath, updatedFileContent);

console.log('Updated link in GitHub Pages');
