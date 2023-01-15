import mongodb from "mongodb";
import fs from "fs";

const DB_CONFIG_PATH = "./db-config.json";

function getMongoDbUri() {
  const dbConfig = JSON.parse(fs.readFileSync(DB_CONFIG_PATH));
  return `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}?retryWrites=true&w=majority`;
}

function getMongoDbName() {
  const dbConfig = JSON.parse(fs.readFileSync(DB_CONFIG_PATH));
  return dbConfig.db;
}

const uri = getMongoDbUri();
const dbName = getMongoDbName();
const client = new mongodb.MongoClient(uri);

async function findAll(collectionName) {
  try {
    const database = client.db(dbName);
    const dbCollection = database.collection(collectionName);

    const query = {}; // empty query to find all documents
    const cursor = dbCollection.find(query);

    // replace console.dir with your callback to access individual elements
    return await cursor.toArray();
  } finally {
    await client.close();
  }
}

async function findByNickName(collectionName, nickName) {
  const database = client.db(dbName);
  const dbCollection = database.collection(collectionName);

  const query = { nickName: nickName };
  const cursor = dbCollection.find(query);

  return await cursor.toArray();
}

async function insertCharacter(characterData) {
  const database = client.db(dbName);
  const dbCollection = database.collection("characters");
  try {
    return await dbCollection.insertOne(characterData);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

// Export findAll function
export { findAll, findByNickName, insertCharacter };
