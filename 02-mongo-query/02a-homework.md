# sample_resturants db

## Q1
```
db.restaurants.find({
    "cuisine": "Hamburgers"
}, {
    "name": 1,
    "cuisine": 1,
    "address": 1
})
```

## Q2
```
db.restaurants.find({
    "cuisine": "American",
    "borough": "Bronx"
}, {
    "name": 1,
    "cuisine": 1,
    "borough": 1
})
```

## Q3
```
db.restaurants.find({
    "address.street": "Stillwell Avenue"
}, {
    "name": 1,
    "address.street": 1
})
```

# sample_mflix db

## Q1 
```
db.movies.find({}).count()
```

## Q2
```
db.movies.find({
    "released": {
        "$lt": ISODate("2000-01-01")
    }
}).count()
```

## Q3
If we are searching for just one value in an array, there is no need to use $in

```
db.movies.find({
    "countries": "USA"
}, {
    "title": 1,
    "countries": 1
}).limit(10)
```

## Q4
```
db.movies.find({
    "countries": {
        "$ne": "USA"
    }
}, {
    "title": 1,
    "countries": 1
}).limit(10)
```
OR 

```
db.movies.find({
    "countries": {
        "$nin": ["USA"]
    }
}, {
    "title": 1,
    "countries": 1
}).limit(10)
```

## Q5
```
db.movies.find({
    "awards.wins": {
        "$gte": 3
    }
}, {
    "title": 1,
    "awards.wins": 1
})
```

## Q6
```
db.movies.find({
    "awards.nominations": {
        "$gte": 3
    }
}, {
    "title": 1,
    "awards.nominations": 1
})
```

## Q7
```
db.movies.find({
    "cast": "Tom Cruise"
}, {
    "title": 1,
    "cast": 1
})
```

## Q8
```
db.movies.find({
    "directors": "Charles Chaplin"
}, {
    "title": 1,
    "directors": 1
})
```