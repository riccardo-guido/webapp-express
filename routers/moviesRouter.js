const express = require("express");
const router = express.Router();
const {
  index,
  getReviews,
  storeReview,
} = require("../controllers/movieController");

// ⬅️  Metti la rotta reviews PRIMA di /:id
router.get("/:id/reviews", getReviews);

// INDEX
router.get("/", index);

router.post("/:id/reviews", storeReview);

module.exports = router;
