import express from "express";
import { findAll, findByNickName } from "./db-connection.js";

const app = express();
const port = 80;

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/characters", (req, res) => {
  findAll("characters")
    .then((tuples) => res.send(tuples))
    .catch((e) => res.send(e));
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
