import express from "express";
import findAll from "./db-connection.js";

const app = express();
const port = 80;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/characters", (req, res) => {
  findAll("characters")
    .then((tuples) => res.send(tuples))
    .catch((e) => res.send(e));
});

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
