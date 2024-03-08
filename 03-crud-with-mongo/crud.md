# Create a new mongo database
We just `use` the database assuming that it exists

Assuming that we want to create a new `animal_shelter`

Just type:
```
use animal_shelter
```

The database is created (ie saved to the hard disk permanently) only when you add a new collection with at least one document to it

# Create a new document in a new collection

Add a new document to a new collection names `animals`

```
db.animals.insertOne({
    'name': 'Fluffy',
    'age': 3,
    'breed': 'Golden Retriever',
    'type': 'Dog'
})
```

# Insert many documents at the same time

```
db.animals.insertMany([
    {
        'name': 'Daisy',
        'age': 5,
        'breed': 'Grey Hound',
        'type': 'Dog'
    },
    {
        'name': 'Timmy',
        'age': 3,
        'breed': 'Border Collie',
        'type': 'Dog'
    }
])
```

Insert the following
```
db.animals.insertOne(
    {
    'name': 'Garfield',
    'age': 3,
    'breed': 'Orange Cat',
    'type': 'Cat'
    }
)
```

# Updating
The general syntax for `updateOne    is:

```
db.collection_name.updateOne({
    <criteria of the document to update>
}, {
    <the new changes>
})
```

db.animals.updateOne({
    '_id': ObjectId('65ea80d23b17d7535dbc9d03')
}, {
    '$set': {
        'name': 'Thunder'
    }
})
```

```
db.animals.updateOne({
    '_id': ObjectId('65ea816f3b17d7535dbc9d04')
}, {
    '$set': {
        'age': 3,
        'breed': 'Brown Dwarf',
        'type': 'rabbit'
    }
})
```

# Delete
```
db.animals.deleteOne({
    '_id': ObjectId("65ea816f3b17d7535dbc9d05")
})
```

# CRUD with arrays
We want to add in a `checkups` to each animal. If an animal has 2 checkups, there should be 2 items int he array

## Add to array
* Note: the array does not have to exist

```
db.animals.updateOne({
    '_id': ObjectId("65ea80d23b17d7535dbc9d03")
}, {
    '$push': {
        'checkups': {
            '_id': ObjectId(),
            'name': 'Dr. Chua',
            'diagnosis': 'flu',
            'treatment': 'pills'
        }
    }
})
```

## Remove from array
* we use `$pull`

Want to update ObjectId("65ea80d23b17d7535dbc9d03"), remove id ObjectId("65ea8a583b17d7535dbc9d0d") from checkups

```
db.animals.updateOne({
    '_id': ObjectId("65ea80d23b17d7535dbc9d03")
}, {
    '$pull': {
        'checkups': {
            '_id': ObjectId("65ea8a583b17d7535dbc9d0d")
        }
    }
})
```

## Modify an item in an array
$elemMatch gives the '_id': ObjectId("65ea8b0b3b17d7535dbc9d0e") a placeholder of $
so 'checkups.$.name' actually refers to 'checkups.ObjectId("65ea8b0b3b17d7535dbc9d0e").name'

```
db.animals.updateOne({
    '_id': ObjectId("65ea80d23b17d7535dbc9d03"),
    'checkups': {
        '$elemMatch': {
            '_id': ObjectId("65ea8b0b3b17d7535dbc9d0e")
        }
    }
}, {
    '$set': {
        'checkups.$.name': 'Dr. Su'
    }
})
```