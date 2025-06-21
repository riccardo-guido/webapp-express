const connection = require("../data/db");

const index = (req, res) => {
  const sql = `
    SELECT 
      movies.*,
      AVG(reviews.vote) AS average_vote
    FROM movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
    GROUP BY movies.id
  `;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Internal server error" });

    res.json({
      status: 200,
      data: results,
    });
  });
};

const show = (req, res) => {
  const movieId = parseInt(req.params.id);

  const movieSql = `SELECT * FROM movies WHERE id = ?`;

  const reviewsSql = `
    SELECT * FROM reviews 
    WHERE movie_id = ?
    ORDER BY created_at DESC
  `;

  connection.query(movieSql, [movieId], (err, movieResults) => {
    if (err) return res.status(500).json({ message: "Error loading movie" });
    if (movieResults.length === 0)
      return res.status(404).json({ message: "Movie not found" });

    const movie = movieResults[0];

    connection.query(reviewsSql, [movieId], (err, reviewResults) => {
      if (err)
        return res.status(500).json({ message: "Error loading reviews" });

      res.json({
        status: 200,
        data: {
          movie,
          reviews: reviewResults,
        },
      });
    });
  });
};

const getReviews = (req, res) => {
  const movieId = parseInt(req.params.id);
  if (Number.isNaN(movieId)) {
    return res.status(400).json({ message: "Invalid movie id" });
  }

  const sql = `
    SELECT * FROM reviews
    WHERE movie_id = ?
    ORDER BY created_at DESC
  `;

  connection.query(sql, [movieId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({
      status: 200,
      data: results,
    });
  });
};

const storeReview = (req, res) => {
  const movieId = parseInt(req.params.id);
  const { id, name, vote, text } = req.body;
  const sqlStoreReview = `
  INSERT INTO moviesdb.reviews (id, movie_id, name, vote, text) VALUES (?, ?, ?, ?, ?);
  `;
  const movie_id = movieId;
  const sqlStoreReviewValues = [id, movie_id, name, vote, text];

  connection.query(sqlStoreReview, sqlStoreReviewValues, (err, results) => {
    res.status(201).json({
      message: "review added",
      id: results.insertId,
    });
  });
};

module.exports = { index, getReviews, storeReview };
