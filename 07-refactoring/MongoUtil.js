const mongodb = require('mongodb');
// a mongoclient allows express (or any nodejs application) to send request to mongo database
const MongoClient = mongodb.MongoClient;

// function to connect to the database
async function connect (uri, dbname) {

    // connect allows us to connect to mongodb and useUnifiedTopology means we want to use the latest structure for mongo
    const client = await MongoClient.connect(uri);

    let db = client.db(dbname);
    return db
}

// export out the connect function
// the reason is so other .js files can use this function
module.exports = { connect }