db.listingsAndReviews.find({
    'cancellation_policy': 'flexible'
}, {
    'name': 1,
    'cancellation_policy': 1,
    'bedrooms': 1
})

db.listingsAndReviews.find({
    'beds': 4,
    'bedrooms': 2
}, {
    'name': 1,
    'beds': 1,
    'bedrooms': 1
})

db.listingsAndReviews.find({
    'accomodate': 4,
    'cancellation_policy': 'flexible'
}, {
    'name': 1,
    'accomodate': 1,
    'cancellation_policy': 1
})

db.listingsAndReviews.find({
    'address.country': 'Brazil'
}, {
    'name': 1,
    'address.country': 1
})

db.listingsAndReviews.find({
    'host.host_name': 'Jonathan'
}, {
    'name': 1,
    'host.host_name': 1
})

db.listingsAndReviews.find({
    'name': {
        '$regex': 'spacious', '$options': 'i'
    }
}, {
    'name': 1
})

db.restaurants.find({
    '_id': ObjectId('5eb3d668b31de5d588f4292a')
}, {
    '_id': 1
})