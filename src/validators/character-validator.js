export const CHARACTER_FIELDS = Object.freeze({
  REAL_NAME: "realName",
  DESCRIPTIONS: "descriptions",
  NICK_NAME: "nickName",
});

function validateCharacterFld(characterData, fld) {
  /**
   * Checks if the characetData object has the specific field and if the type is correct.
   *
   * @param {object} characterData - The character data to be validated.
   * @param {string} fld - The field to be validated (Fields as mapped in the constant CHARACTER_FIELDS).
   *
   * @returns {boolean} - True if the characterData is valid, false otherwise.
   */

  /* At the current version, all the fields shall be strings */
  if (
    characterData.hasOwnProperty(fld) &&
    typeof characterData[fld] === "string" &&
    characterData[fld].length > 5
  ) {
    return true;
  }

  return false;
}

function validateCharacter(characterData) {
  /**
   * Checks if the characterData object has the required fields and
   * if the type are correct.
   *
   * @param {object} characterData - The character data to be validated.
   *
   * @returns {boolean} - True if the characterData is valid, false otherwise.
   */
  if (typeof characterData !== "object" || characterData === null) {
    return false;
  }

  if (
    validateCharacterFld(characterData, CHARACTER_FIELDS.REAL_NAME) === false ||
    validateCharacterFld(characterData, CHARACTER_FIELDS.DESCRIPTIONS) ===
      false ||
    validateCharacterFld(characterData, CHARACTER_FIELDS.NICK_NAME) === false
  ) {
    return false;
  }

  return true;
}

export { validateCharacter, validateCharacterFld };
