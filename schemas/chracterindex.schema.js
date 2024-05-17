import mongoose from 'mongoose'

// characterSchema를 정의합니다. 
const characterIndexSchema = new mongoose.Schema({
  characterIndex: { // 이 필드는 실제 사용될 데이터의 이름입니다.
    type: Number, // 이 필드의 데이터 타입이 숫자임을 나타냅니다.
    required: true // 이 필드가 반드시 있어야 함을 나타냅니다.
  }
});


// characterSchema를 사용하여 'Gamedata'라는 이름의 mongoose 모델을 생성합니다.
export default mongoose.model("CharactersIndex", characterIndexSchema);
