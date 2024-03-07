# see all databases
```
show databases
```

# change the active database
``` 
use sample_airbnb
```

# show all the collections in the current active database
```
show collections
```

# show the current active database
```
db
```

# get all documents from a collection
```
db.listingsAndReviews.find()
```

# projection: extract only a few keys out from each document

The second argument of `.find()` is the `projection object`. It allows us to list which keys we want
The first argument is the filtering criteria
```
db.listingsAndReviews.find({},{
    'name': 1,
    'beds': 1,
    'bedrooms': 1
})
```

# filtering 
allows us to only get documents that fits a certain criteria. we only have listings that have exactly 2 beds

```
db.listingsAndReviews.find({
    'beds': 2
}, {
    'name': 1,
    'beds': 1
})
```

find all listing where all property type is condominium but only display its name, number of beds and property type
```
db.listingsAndReviews.find({
    'property_type': 'Condominium'
}, {
    'beds': 1,
    'property_type': 1,
    'beds': 1
})
```

# find by key inside object
show all listing where country is Brazil

```
db.listingsAndReviews.find({
    'address.country': 'Brazil'
}, {
    'name': 1,
    'address.country': 1
})
```

# find by a value inside a array
amenities is an array ['Oven', 'BBQ Grill', 'Doorway']

```
db.listingsAndReviews.find({
    'amenities': 'Oven'
}, {
    'name': 1,
    'amenities': 1
})
```

# show all listings in which amenities include both oven and coffee maker
```
db.listingsAndReviews.find({
    'amenities': {
        '$in': ['Oven', 'Cofee maker']
    }
}, {
    'name': 1,
    'amenities': 1
})
```

# searching by either or
find all listings that are in brazil or canada

```
db.listingsAndReviews.find({
    '$or': [
        {
            'address.country': 'Brazil'
        },
        {
            'address.country': 'Canada'
        }
    ]
}, {
    'name': 1,
    'address.country': 1
})
```

find all listings that are in brazil and have 2 bedrooms or listings are in canada and the cancellation policy is flexible

```
db.listingsAndReviews.find({
    '$or': [
        {
            'address.country': 'Brazil',
            'bedrooms': 2
        },
        {
            'address.country': 'Canada',
            'cancellation_policy': 'flexible'
        }
    ]
}, {
    'name': 1,
    'address.country': 1,
    'bedrooms': 1,
    'cancellation_policy': 1
})
```

# searching by range of values
find all listings that has between 2 to 4 beds

```
db.listingsAndReviews.find({
    'beds': {
        '$gt': 1,
        '$lt': 5
    }
}, {
    'name': 1,
    'beds': 1
})
```

find all listings that accomodate between 3 to 6 people
```
db.listingsAndReviews.find({
    'accommodates': {
        '$gte': 3,
        '$lte': 6
    }
}, {
    'name': 1,
    'accommodates': 1
})
```


# finding by dates
find all listings which first reviewed is before the year 2020

```
db.listingsAndReviews.find({
    'first_review': {
        '$lt': ISODate("2020-01-01")
    }
}, {
    'name': 1,
    'first_review': 1
})
```

# find by a string
find all listings which name contains the string "Spacious"
* `'$regex'`: search for the string 'spacious' within the 'name key'
* `'$options': 'i'`: ignore case

```
db.listingsAndReviews.find({
    'name': {
        '$regex': 'spacious', '$options': 'i'
    }
}, {
    'name': 1
})
```

# find document by its ID

```
use sample_restaurants
db.restaurants.find({
    '_id': ObjectId('5eb3d668b31de5d588f4292a')
}, {
    '_id': 1
})
```

# counting
```
db.listingsAndReviews.find({
    'first_review': {
        '$lt': ISODate("2020-01-01")
    }
}, {
    'name': 1,
    'first_review': 1
}).count()
```