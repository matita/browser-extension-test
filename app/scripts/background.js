const { version } = require('../../package.json');

browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
})

browser.browserAction.setBadgeText({
  text: version
})

console.log(`'Allo 'Allo! Event Page for Browser Action`)
