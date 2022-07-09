const router = require("express").Router();
const { addRole } = require("../controllers/roleController");

router.post("/", addRole);

module.exports = router;
