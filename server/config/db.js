import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "hyori",
  password: "1111",
  database: "my_movie_diary",
});

export default db;
