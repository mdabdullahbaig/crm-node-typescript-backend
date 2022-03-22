import { Router } from "express";
import {
  createUser,
  getUsers,
  updateUserById,
  deleteUserById,
} from "../controller/userController";
import validate from "../middleware/requestValidator";
import { createUserDto, updateUserDto } from "../dto/userDto";

const router: Router = Router();

router.post("/", validate(createUserDto), createUser);
router.get("/", getUsers);
router.patch("/:id", validate(updateUserDto), updateUserById);
router.delete("/:id", deleteUserById);

export default router;
