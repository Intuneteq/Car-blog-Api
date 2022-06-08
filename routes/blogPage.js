const express = require("express");
const router = express.Router();
const {
  blogPage,
  blogPageDelete,
  blogPageUpdate,
} = require("../controllers/blogPage");

router.get("/blogPage/:_id", blogPage);
router.delete("/blogPage/:_id", blogPageDelete);
router.put("/blogPage/:_id", blogPageUpdate);

module.exports = router;
