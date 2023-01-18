import { Router } from "express";
import { validateCharacter } from "../validators/character-validator.js";
import { findAll, findByNickName, insertCharacter } from "./db-connection.js";

const characterRoutes = Router();

characterRoutes.get("/", async (req, res) => {
  res.send("Hello World!!!");
});

characterRoutes.get("/:id", async (req, res) => {
  const result = await retrieveCharacter(db, req.params.id);
  result.id = result._id;
  result._id = undefined;
  if (!result) {
    res.status(404).send({ message: "O personagem não foi encontrado" });
  } else {
    res.status(200).send(result);
  }
});

characterRoutes.get("/characters", (req, res) => {
  findAll("characters")
    .then((tuples) => res.send(tuples))
    .catch((e) => res.send(e));
});

characterRoutes.post("/character", async (req, res) => {
  const characterData = req.body;

  // Check characterData fields
  if (!validateCharacter(characterData)) {
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

characterRoutes.get("/character/:nick_name", async (req, res) => {
  const nick_name = req.params.nick_name;
  findByNickName("characters", nick_name)
    .then((tuples) => res.send(tuples))
    .catch((e) => res.send(e));
});

export default characterRoutes;
