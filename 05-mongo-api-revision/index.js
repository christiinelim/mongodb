const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
require('dotenv').config();

const app = express();
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

// enable use of JSON
app.use(express.json());

// enable cors
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;


async function connect(uri, dbname){
    const client = await MongoClient.connect(uri);
    const db = client.db(dbname);
    return db
}


async function main(){
    const db = await connect(MONGO_URI, DB_NAME);
    app.get('/', (req, res) => {
        res.json({
            "message": "API is running"
        })
    })

    // usually, RESTful API's URLs will begin with `/api/` to differentiate them from routes that renders `hbs`
    app.get('/api/exprenses', async (res, req) => {
        const exprenses = await db.collection('expenses').find({});
        res.json({
            'expenses': expenses
        });
    });

    app.post('/api/expenses', async(req, res) => {
        // short form below
        // const title = req.body.title;
        // const cost = req.body.cost;
        // const tag = req.body.tag;
        // const date = req.body.date

        const { title, cost, tags, date } = req.body; // <- object destructuring

        // if the name of the key is the same as variable name, can use the shortcut below
        // const newExpense = {
        //     "title": title,
        //     "cost": cost,
        //     "tags": tags,
        //     "date": new Date (date)
        // }

        const newExpense = { title, cost, tags, date: new Date(date) };
        const result = await db.collection("expenses").insertOne(newExpense);
        res.json({
            result
        }) // short form
    })

    app.put('/api/expenses/:expenseid', async(req, res) => {
        const expenseId = req.params.expenseid;
        const { title, cost, tags, date} = req.body;
        const modifiedExpense = {
            title, cost, tags, date: new Date(date)
        };
        const result = await db.collection('expenses').updateOne({
            "_id": new ObjectId(expenseId)
        },{
            "$set": modifiedExpense
        });
        res.json({
            result: result
        })
    })


    app.delete('/api/expenses/:expenseid', async (req, res) => {
        const expenseId = req.params.expenseid;
        const result = await db.collection("expenses").deleteOne({
            "_id": new ObjectId(expenseId)
        });

        res.json({
            result
        })
    })
}


main();

app.listen(3000, () => {
    console.log("Server is running")
})