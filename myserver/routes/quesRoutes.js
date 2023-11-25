const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/get-easy",postController.getEasy);
router.get("/get-medium",postController.getMedium);
router.get("/get-hard",postController.getHard);
router.post("/add-ques",postController.addToBank);

module.exports = router;