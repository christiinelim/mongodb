// sample_resturants db

db.restaurants.find({
    "cuisine": "Hamburgers"
}, {
    "name": 1,
    "cuisine": 1
})


db.restaurants.find({
    "cuisine": "American",
    "borough": "Bronx"
}, {
    "name": 1,
    "cuisine": 1,
    "borough": 1
})

db.restaurants.find({
    "address.street": "Stillwell Avenue"
}, {
    "name": 1,
    "address.street": 1
})


// sample_mflix db
db.movies.count()

db.movies.find({
    "released": {
        "$lt": ISODate("2020-01-01")
    }
}, {}).count()

db.movies.find({
    "countries": "USA"
}, {
    "title": 1,
    "countries": 1
}).limit(10)


db.movies.find({
    "countries": {
        "$ne": "USA"
    }
}, {
    "title": 1,
    "countries": 1
}).limit(10)


db.movies.find({
    "awards.wins": {
        "$gte": 3
    }
}, {
    "title": 1,
    "awards.wins": 1
})


db.movies.find({
    "awards.nominations": {
        "$gte": 3
    }
}, {
    "title": 1,
    "awards.nominations": 1
})



db.movies.find({
    "cast": "Tom Cruise"
}, {
    "title": 1,
    "cast": 1
})


db.movies.find({
    "directors": "Charles Chaplin"
}, {
    "title": 1,
    "directors": 1
})