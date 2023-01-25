import { Router } from "express";
import { db } from "../repository/db.js";
import {
  validateCharacter,
  validateCharacterFld,
  CHARACTER_FIELDS,
} from "../validators/character-validator.js";
import {
  findAll,
  findByNickName,
  insertCharacter,
  findById,
  removeCharacter,
  updateCharacter,
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
    res.status(404).send({ message: "The character wasn't finded" });
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

characterRoutes.post("/remove", async (req, res) => {
  const characterData = req.body;

  removeCharacter(db, characterData.nickName).then((result) =>
    res.send(result)
  );
});

characterRoutes.post("/update/:id", async (req, res) => {
  const characterData = req.body;
  const cleredCharacterData = {};

  /**
   * Generate an object with only the valid fields for the
   * character data. If any extra field is provided it will be ignored.
   **/
  for (const fld in characterData) {
    if (fld in CHARACTER_FIELDS) {
      if (validateCharacterFld(characterData, fld)) {
        cleredCharacterData[fld] = characterData[fld];
      } else {
        res
          .status(400)
          .send(
            `Invalid character data. The field ${fld} must be a string with at least 5 characters`
          );
        return;
      }
    }
  }

  // Update the character data at the database using the ID data from the URI
  try {
    const result = await updateCharacter(
      db,
      req.params.id,
      cleredCharacterData
    );

    if (result.sucess) {
      res.status(200).send("Character updated");
    } else {
      res.status(404).send("Character not updated");
    }
  } catch (e) {
    res.status(500).send("Error updating the character");
  }
});

export default characterRoutes;
