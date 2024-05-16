import express from 'express';
import connect from './schemas/index.js';
import charactersRouter from './routes/characters.router.js';
import itemsRouter from './routes/item.router.js';


const app = express();
const PORT = 3000;
connect(); // 몽고디비를 연결하기 위한 커넥트 함수 실행

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('./public')); // public 폴더 안 index.html static으로 지정

app.use('/character', charactersRouter); //character 관련 라우터
app.use('/item',itemsRouter); //item 관련 라우터

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
  });