const router = require("express").Router();
const { verifyToken } = require("../helpers/jwt");
const {
  getUsersAll,
  loginUser,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  getNewTokens,
  logOut,
} = require("../controllers/userController");

router.get("/", verifyToken, getUsersAll);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/refresh", getNewTokens);
router.post("/logout", logOut);

module.exports = router;
