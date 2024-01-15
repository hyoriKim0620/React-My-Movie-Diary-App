import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/userInfo/:userEmail", (req, res) => {
  const userEmail = req.params.userEmail;

  db.query(
    `SELECT * FROM user_table WHERE email = '${userEmail}'`,
    (err, data) => {
      if (!err) res.send({ data });
      else res.send(err);
    }
  );
});

router.post("/honeyMovies/:email", async (req, res) => {
  const email = req.params.email;
  const movie = req.body.data;
  let updatedHoneyMoviesId = "";

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_table WHERE email='${email}'`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    const honeyMoviesId = JSON.parse(results[0].honeyMovieIds);
    honeyMoviesId.push(movie);

    updatedHoneyMoviesId = JSON.stringify(honeyMoviesId);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "honeyMovies edited Error" });
  }

  db.query(
    `UPDATE user_table SET honeyMovieIds = '${updatedHoneyMoviesId}' WHERE email='${email}'`,
    (err) => {
      if (!err)
        res.send({ success: true, message: "honeyMovies edited success" });
      else res.send(err);
    }
  );
});

router.delete("/honeyMovies/:movieData", async (req, res) => {
  const { email, movieId } = JSON.parse(req.params.movieData);
  let updatedHoneyMoviesId = "";

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_table WHERE email='${email}'`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    let honeyMoviesId = JSON.parse(results[0].honeyMovieIds);
    honeyMoviesId = honeyMoviesId.filter(
      (movie) => movie.id !== Number(movieId)
    );

    updatedHoneyMoviesId = JSON.stringify(honeyMoviesId);
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "honeyMovies edited Error" });
  }
  db.query(
    `UPDATE user_table SET honeyMovieIds = '${updatedHoneyMoviesId}' WHERE email='${email}'`,
    (err) => {
      if (!err)
        res.send({ success: true, message: "honeyMovies edited success" });
      else res.send(err);
    }
  );
});

export default router;
