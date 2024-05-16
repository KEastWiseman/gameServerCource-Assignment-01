import express from "express";
import Items from "../schemas/item.schema.js";

const router = express.Router(); // Express.js의 라우터 생성

// GET 아이템 목록
router.get("/list",async(req,res)=>{
    const items= await Items.find({});
    if(items){
        return res.status(200).json({items});
    }
    else{
        return res.status(400).json({success:false, errorMessage:"아이템이 없습니다."});
    }
})

// GET 아이템 상세 정보 가져오기
router.get("/detailInfo/:code", async (req, res) => {
  const item_code = req.params.code;

  const item = await Items.findOne({ item_code: item_code }).exec();
  if (item) {
    return res.status(200).json({ success: true, item });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: "없는 아이템 입니다." });
  }
});

// CREATE 아이템 생성
router.post("/create", async (req, res) => {
  const { item_code, item_name, item_stat } = req.body;

  const item = await Items.findOne({
    item_name: item_name,
  }).exec(); //
  if (item) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "중복된 아이템 코드입니다" });
  }

  const createdItem = await Items.create({
    item_code,
    item_name,
    item_stat,
  });

  return res.status(201).json(createdItem);
});

// UPDATE 아이템
router.patch("/change/:code", async (req, res) => {
  const item_code = req.params.code;
  const {item_name, item_stat} = req.body;
  const item = await Items.findOne({ item_code: item_code }).exec();
  if (item) {
    item.item_name = item_name;
    item.item_stat = item_stat;
    item.save();
    return res.status(200).json({ success: true, item });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: "없는 아이템 입니다." });
  }
});
export default router;
