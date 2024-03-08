const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
require('dotenv').config();

const MongoClient = mongodb.MongoClient;

const app = express();

app.use(cors());
app.use(express.json());


async function connect (uri, dbname) {
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    })

    const db = client.db(dbname);
    return db
}

async function main(){
    const uri = process.env.MONGO_URI;
    const db = await connect(uri, "clothes-catalogue");

    app.get('/clothes-catalogue', async (req, res) => {

        try {
            const results = await db.collection("clothes").find({}).toArray();

            res.json({
                'results': results
            })
        } catch (e) {
            res.status(500);

            res.json({
                'error': e
            })
        }
        
    })


    app.post('/clothe-catalogue', async (req, res) => {
        try {
            const SKU = req.body.SKU;
            const name = req.body.name;
            const size = req.body.size;
            const cost = req.body.cost;

            const result = await db.collection("clothes").insertOne({
                'SKU': SKU,
                'name': name,
                'size': size,
                'cost': cost
            })

            res.json({
                'result': result
            })
        } catch (e) {
            res.status(500);
            res.json({
                'error': e
            })
        }
    })
}

main();



app.listen(3000, () => {
    console.log("server has started")
})