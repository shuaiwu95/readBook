var mysql = require('mysql')
const confDb = require('../config/dbConf.json')
var config = {
    host: confDb.ip,
    port: confDb.port,
    user: confDb.user,
    password: confDb.password,
    database: confDb.database,
    useConnectionPooling: true
}
exports.getConnection = function () {
    return mysql.createConnection(config);
}