import { COLLECTION_NAMES } from "./db-constants.js";
import { ObjectId } from "mongodb";

async function findAll(db, collectionName) {
  const collection = db.collection(collectionName);
  return await collection.find({}).toArray();
}

async function findById(db, characterId) {
  const collection = db.collection(COLLECTION_NAMES.CHARACTERS);
  const query = { _id: new ObjectId(characterId) };
  return await collection.findOne(query);
}

async function findByNickName(db, nickName) {
  const collection = db.collection(COLLECTION_NAMES.CHARACTERS);
  const query = { nickName: nickName };
  return await collection.findOne(query);
}

async function insertCharacter(db, characterData) {
  const collection = db.collection(COLLECTION_NAMES.CHARACTERS);
  try {
    const result = await collection.insertOne({ ...characterData });
    return {
      sucess: result.acknowledged,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { findAll, findById, findByNickName, insertCharacter };
