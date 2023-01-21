import fs from "fs";
import mongodb from "mongodb";

const DB_CONFIG_PATH = "./configs/db-config.json";

function getMongoDbUri() {
  const dbConfig = JSON.parse(fs.readFileSync(DB_CONFIG_PATH));
  return `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}`;
}

const URI = getMongoDbUri();

export let db;

export const connectToDatabase = async () => {
  try {
    const client = new mongodb.MongoClient(URI);
    await client.connect();
    db = client.db();
    console.log(`Connect object created to database: ${db.databaseName}`);
  } catch (e) {
    console.log(
      "There was an error: [" +
        e +
        "] when creating connection object to database: "
    );
  }
};

export const initializeDatabase = async () => {
  await connectToDatabase();
};
