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
