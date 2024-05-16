import express from "express";
import Characters from "../schemas/character.schema.js"; // Character Schema 가져오기
import Items from '../schemas/item.schema.js'

const router = express.Router(); // Express.js의 라우터 생성

router.post('/character/create', async (req, res) => {
  console.log(`입력된 데이터 >>>> ${req.body}`);
  const { characterId, characterName, characterStats } = req.body;

  const characters = await Characters.findOne({ characterName: characterName }).exec(); //
  if (characters) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "중복된 이름입니다." });
  }

  const createdCharacters = await Characters.create({
    characterId,
    characterName,
    characterStats
  });

  return res.status(201).json(createdCharacters.characterId);
});

router.delete('/character/delete/:id', async(req,res)=>{
  const characterId = req.params.id;

  const deletedCharacter = await Characters.findOneAndDelete({ characterId : characterId });
  if (!deletedCharacter) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "없는 캐릭터 입니다." });
  }

  res.status(203).json({ success: true, deletedCharacter });
})

export default router;
