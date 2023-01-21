import { Router } from "express";
import { db } from "../repository/db.js";
import { validateCharacter } from "../validators/character-validator.js";
import {
  findAll,
  findByNickName,
  insertCharacter,
  findById,
} from "../repository/character-repository.js";

const characterRoutes = Router();

characterRoutes.get("/all", (_, res) => {
  findAll(db, "characters").then((tuples) => {
    res.send(tuples);
  });
});

characterRoutes.get("/:id", async (req, res) => {
  const result = await findById(db, req.params.id);
  result.id = result._id;
  result._id = undefined;
  if (!result) {
    res.status(404).send({ message: "O personagem não foi encontrado" });
  } else {
    res.status(200).send(result);
  }
});

characterRoutes.get("/nickname/:nick_name", async (req, res) => {
  const nick_name = req.params.nick_name;
  findByNickName(db, nick_name)
    .then((tuples) => {
      res.send(tuples);
    })
    .catch((e) => res.send(e));
});

characterRoutes.post("/insert", async (req, res) => {
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

  insertCharacter(db, characterData).then((result) => res.send(result));
});

export default characterRoutes;
