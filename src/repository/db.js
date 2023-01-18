import mongodb from "mongodb";
import { DATABASE_NAME } from "./db-constants.js";

const DB_CONFIG_PATH = "./db-config.json";

function getMongoDbUri() {
  const dbConfig = JSON.parse(fs.readFileSync(DB_CONFIG_PATH));
  return `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}?retryWrites=true&w=majority`;
}

function getMongoDbName() {
  const dbConfig = JSON.parse(fs.readFileSync(DB_CONFIG_PATH));
  return dbConfig.db;
}

const URI = getMongoDbUri();
const DATABASE_NAME = getMongoDbName();

export let db;

export const connectToDatabase = async () => {
  try {
    const client = new mongodb.MongoClient(URI);
    await client.connect();
    db = client.db(DATABASE_NAME);
    console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (e) {
    console.log(
      "There was an error: [" +
        e +
        "] when connecting to database: " +
        DATABASE_NAME
    );
  }
};

export const initializeDatabase = async () => {
  await connectToDatabase();
};
