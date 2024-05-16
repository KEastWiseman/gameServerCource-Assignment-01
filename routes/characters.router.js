import express from "express";
import Characters from "../schemas/character.schema.js"; // Character Schema 가져오기

const router = express.Router(); // Express.js의 라우터 생성

// GET 캐릭터 정보
router.get("/info/:id", async (req, res) => {
  const characterId = req.params.id;

  const character = await Characters.findOne({
    characterId: characterId,
  }).exec();
  if (character) {
    return res.status(200).json({ success: true, character });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: "없는 캐릭터 입니다." });
  }
});

// CREATE 캐릭터
router.post("/create", async (req, res) => {
  const { characterId, characterName, characterStats } = req.body;

  const characters = await Characters.findOne({
    characterName: characterName,
  }).exec(); //
  if (characters) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "중복된 이름입니다." });
  }

  const createdCharacters = await Characters.create({
    characterId,
    characterName,
    characterStats,
  });

  return res.status(201).json(createdCharacters.characterId);
});

// DELETE 캐릭터
router.delete("/delete/:id", async (req, res) => {
  const characterId = req.params.id;

  const deletedCharacter = await Characters.findOneAndDelete({
    characterId: characterId,
  });
  if (!deletedCharacter) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "없는 캐릭터 입니다." });
  }

  res.status(203).json({ success: true, deletedCharacter });
});

export default router;
