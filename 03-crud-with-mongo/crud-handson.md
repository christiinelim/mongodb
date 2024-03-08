db.students.insertMany([
    {
        'name': 'Jane Doe',
        'age': 13,
        'subjects': ['Defense Against the Dark Arts', 'Charms', 'History of Magic'],
        'dateEnrolled': ISODate('2016-05-13')
    },
    {
        'name': 'James Verses',
        'age': 14,
        'subjects': ['Transfiguration', 'Alchemy'],
        'dateEnrolled': ISODate('2015-06-15')
    },
    {
        'name': 'Jonathan Goh',
        'age': 12,
        'subjects': ['Divination', 'Study of Ancient Runes'],
        'dateEnrolled': ISODate('2017-04-16')
    }
])


db.students.updateOne({
    '_id': ObjectId("65ea852f3b17d7535dbc9d08")
}, {
    '$push': {
        'subjects': 'Arithmancy'
    }
})


db.students.updateOne({
    '_id': ObjectId("65ea852f3b17d7535dbc9d07")
}, {
    '$pull': {
        'subjects': 'History of Magic'
    }
})