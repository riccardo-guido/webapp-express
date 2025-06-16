const express = require("express");
const movieController = require("../controllers/movieController");
const router = express.Router();

//# INDEX
router.get("/", movieController.index);
//# SHOW
router.get("/:id", movieController.show);
//# STORE
router.post("/", movieController.store);
//# UPDATE
router.put("/:id", movieController.update);
//# MODIFY
router.patch("/:id", movieController.modify);
//# DESTROY
router.delete("/:id", movieController.destroy);

module.exports = router;
