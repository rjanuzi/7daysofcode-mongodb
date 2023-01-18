import express from "express";
import { findAll, findByNickName, insertCharacter } from "./db-connection.js";

const app = express();
const port = 80;

// This is needed to receive posts from clients with JSON payloads
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/characters", (req, res) => {
  findAll("characters")
    .then((tuples) => res.send(tuples))
    .catch((e) => res.send(e));
});

app.post("/character", (req, res) => {
  const characterData = req.body;

  // Check characterData fields
  if (
    typeof characterData.realName !== "string" ||
    typeof characterData.descriptions !== "string" ||
    typeof characterData.nickName !== "string" ||
    characterData.realName.length <= 5 ||
    characterData.descriptions.length <= 5 ||
    characterData.nickName.length <= 5
  ) {
    res
      .status(400)
      .send(
        "Invalid character data. All the fields realName, descriptions and nickName must be strings with at least 5 characters"
      );
    return;
  }

  insertCharacter(characterData)
    .then((result) => {
      res.send("OK");
    })
    .catch((e) => {
      res.status(404).send("Error inserting character: " + e);
    });
});

app.get("/character/:nick_name", (req, res) => {
  const nick_name = req.params.nick_name;
  findByNickName("characters", nick_name)
    .then((tuples) => res.send(tuples))
    .catch((e) => res.send(e));
});

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
