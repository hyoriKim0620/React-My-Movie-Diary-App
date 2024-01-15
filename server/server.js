// express 모듈 호출
import express from "express";
import bodyParser from "body-parser";
import apiRoutes from "./routes/index.js";
// import mysql from 'mysql';

const app = express();
// bodyParser middleware를 사용하여 JSON 파싱 설정
app.use(bodyParser.json());

// http://localhost:4000/ 으로 접속 시 응답메시지 출력
app.get("/", (req, res) => {
  res.send("Server Response Success");
});

// "/api"로 시작하는 모든 요청은 apiRoutes에서 처리
app.use("/api", apiRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});
