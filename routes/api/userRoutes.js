const router = require("express").Router()
const {
    getUsers,
    addNewUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require("../../controllers/userController")

router.route("/").get(getUsers).post(addNewUser)
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser)
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend)

module.exports = router;