const { execSync } = require('child_process');

execSync(`yarn build firefox`);
require('./sign-firefox');
require('./update-page');
execSync('git add .');
