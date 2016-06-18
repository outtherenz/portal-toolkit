const existsSync = require('exists-sync');
const path = require('path');

module.exports = {
  description: 'Generates an acceptance test for a feature.',

  locals() {
    const destoryAppPath = path.join(this.project.root, '/tests/helpers/destroy-app.js');
    const destroyAppExists = existsSync(destoryAppPath);
    return { destroyAppExists };
  }
};
