const oracledb = require('oracledb');
const { init } = require('./db.js');

const db_helper = new Object();
const result = await init();
console.log(`result ${result}`);

(async () => {
    const result = await init();
    db_helper.connection = result;
    console.log(`inner ${db_helper}`);
})();




