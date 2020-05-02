const { execSync } = require('child_process');

execSync(`yarn build firefox`);
// require('./sign-firefox');
execSync('git add .');
