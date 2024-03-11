const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

//  if we are trying to require from out own file, we need the './'
const { connect } = require('./MongoUtil');
const { authenticateWithJWT } = require('./middleware');

const app = express();


// FOR CREATING API ONLY, NOT FOR HBS
// enable cors
app.use(cors());

// set JSON as the means of receiving request and sending responses
app.use(express.json());




function generateAccessToken(id, email){
    // the first argument of `jwt.sign` is the payload you want 
    // the second argument of `jwt.sign` is the token secret
    // the third argument of `jwt.sign` is an option object
    return jwt.sign({
        'user_id': id,
        'email': email
    }, process.env.TOKEN_SECRET, {
        'expiresIn': '3d' // w=weeks, d=days, h=hours, m=minutes
    })
}

async function main() {
    // connection string is now from env file
    const uri = process.env.MONGO_URI;
    const db = await connect(uri, "food_sightings");


    // create the routes after connecting to the database
    app.get('/food-sightings', async (req, res) => {
        try {

            // empty criteria
            const criteria = {};

            if (req.query.description) {
                criteria.description = {
                    '$regex': req.query.description,
                    '$options': 'i'
                }
            }

            if (req.query.food) {
                criteria.food = {
                    '$in': [req.query.food]
                }
            }

            console.log(criteria)

            const results = await db.collection("sightings").find(criteria).toArray();

            res.json({
                'sightings': results
            })
        } catch (e) {
            res.status(500);

            res.json({
                "error": e
            })
        }
    })



    /*
        Sample Food Sighting document
        {
            _id: ObjectId(),
            description: "Chinese Buffet at LT2",
            food: ["fried food", "chicken wings"],
            datetime: 2024-03-08
        }
    */

    app.post('/food-sighting', async (req, res) => {

        // try catch is for exception handling
        // an exception is an unexpected error usually from a third party
        // in this case the 3rd party is Mongo Atlas
        try {
            const description = req.body.description;
            const food = req.body.food;
            const datetime = req.body.datetime ? new Date(req.body.datetime) : new Date();

            // validate input is not empty
            if (!description) {
                res.status(400);
                res.json({
                    'error': 'A description must be provided'
                });
                return;
            }

            if (!food || !Array.isArray(food)) {
                res.status(400);
                res.json({
                    'error': 'Food must be provided and must be an array'
                });
                return;
            }

            const result = await db.collection("sightings").insertOne({
                'description': description,
                'food':food,
                'datetime': datetime
            });

            res.json({
                'result': result
            })
        } catch (e) {
            res.status(500); // internal server error
            res.json({
                'error': e
            })
        }
    })


    app.put('/food-sightings/:id', async (req, res) => {

        try {
            const description = req.body.description;
            const food = req.body.food;
            const datetime = req.body.datetime ? new Date(req.body.datetime) : new Date();

            if (!description || !food || !Array.isArray(food)){
                res.status(400); // bad request - the client did not follow the specifications
                res.json({
                    'error': 'Invalid data provided'
                })
                return;
            }

            const result = await db.collection("sightings").updateOne({
                "_id": new ObjectId(req.params.id)
            }, {
                "$set": {
                    "description": description,
                    "food": food,
                    "datetime": datetime
                }
            })

            res.json({
                "result": result
            })
        } catch (e) {
            res.status(500);
            res.json({
                'error': 'Internal Server Error'
            })
        }
    })

    app.delete('/food-sighting/:id', async (req, res) => {
        await db.collection("sightings").deleteOne({
            "_id": new ObjectId(req.params.id)
        });

        res.json({
            "message": "deleted"
        })
    })

    // users sign up and log in
    // it is very common in RESTful API to represent a process as a document that is created because of said process
    app.post('/user', async (req, res) => {
        // bcrypt.hash takes two argument:
        // 1. the plaintext that you want to hasj
        // 2. how secure you want it
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const result = await db.collection('users').insertOne({
            'email': req.body.email,
            'password': hashedPassword
        });
        res.json({
            'result': result
        })
    })

    app.post('/login', async (req, res) => {
        // 1. find user by email address
        const user = await db.collection('users').findOne({
            email: req.body.email
        })
        // 2. check if the password matches
        if (user){
            //bcrypt.compare()
            // first argument is the plain text
            // second argument is the hashed version
            if (await bcrypt.compare(req.body.password, user.password)) {
                //valid login so generate the JWT
                const token = generateAccessToken(user._id, user.email);
                res.json({
                    'token': token
                })
            } else {
                res.status(400);
                return res.json({
                    "error": "Invalid login credentials"
                })
            }
        } else {
            res.status(400);
            return res.json({
                "error": "Invalid login credentials"
            })
        }
        // 3. generate and send back the JWT (aka access token)
    });

    // protected route: client must provide the JWT to access
    app.get('/profile', authenticateWithJWT, async (req, res) => {
        res.json({
            "message": "success in accessing protected route",
            'payload': req.payload
        })
    });

    app.get('/payment', authenticateWithJWT, async(req, res) => {
        res.json({
            "message": "accessing protected payment route"
        })
    })
}


main();



app.listen(3000, () => {
    console.log("server has started")
})