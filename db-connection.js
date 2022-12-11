const { MongoClient } = require('mongodb')
const dbConfig = require('./db-config.json')
console.log(dbConfig)
const uri =
  'mongodb+srv://' +
  dbConfig.username +
  ':' +
  dbConfig.password +
  '@' +
  dbConfig.host +
  '/' +
  dbConfig.db

const client = new MongoClient(uri)

async function run () {
  try {
    const database = client.db(dbConfig.db)
    const movies = database.collection('characters')

    // query for movies that have a runtime less than 15 minutes
    const query = {}

    const cursor = movies.find(query)

    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir)
  } finally {
    await client.close()
  }
}
run().catch(console.dir)
