function validateCharacter(characterData) {
  if (typeof characterData !== "object" || characterData === null) {
    return false;
  }

  if (
    characterData.hasOwnProperty("realName") === false ||
    characterData.hasOwnProperty("descriptions") === false ||
    characterData.hasOwnProperty("nickName") === false
  ) {
    return false;
  }

  if (
    typeof characterData.realName !== "string" ||
    typeof characterData.descriptions !== "string" ||
    typeof characterData.nickName !== "string"
  ) {
    return false;
  }

  if (
    characterData.realName.length <= 5 ||
    characterData.descriptions.length <= 5 ||
    characterData.nickName.length <= 5
  ) {
    return false;
  }

  return true;
}

export { validateCharacter };
