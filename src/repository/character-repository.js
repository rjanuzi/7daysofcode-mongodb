import { COLLECTION_NAMES } from "./db-constants.js";
import { ObjectId } from "mongodb";

async function findAll(db, collectionName) {
  try {
    const dbCollection = db.collection(collectionName);

    const query = {}; // empty query to find all documents
    const cursor = dbCollection.find(query);

    // replace console.dir with your callback to access individual elements
    return await cursor.toArray();
  } finally {
    await client.close();
  }
}

async function findById(db, characterId) {
  const dbCollection = db.collection(COLLECTION_NAMES.CHARACTERS);
  const query = { _id: new ObjectId(characterId) };
  return await dbCollection.findOne(query);
}

async function findByNickName(db, nickName) {
  const dbCollection = db.collection(COLLECTION_NAMES.CHARACTERS);
  const query = { nickName: nickName };
  return await dbCollection.findOne(query);
}

async function insertCharacter(db, characterData) {
  const dbCollection = db.collection(COLLECTION_NAMES.CHARACTERS);
  try {
    const result = await dbCollection.insertOne({ ...characterData });
    return {
      id: result.insertedId,
      sucess: result.acknowledged,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { findById, findByNickName, insertCharacter };
