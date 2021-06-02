const mongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const connectionURL = "mongodb://abdulbari:saif@127.0.0.1:27017/schedulerDB";

var mongoConn;

var createConnection = function( callback )
{
    mongoClient.connect( connectionURL, {
     poolSize: 10
    },  function( err, db) {
    assert.equal(null,err);
    mongoConn = db;
    callback( err );
    });
}

var getConnection = function()
{
    return mongoConn.db("schedulerDB");
}

module.exports = {
    createConnection: createConnection,
    getConnection: getConnection
};