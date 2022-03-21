import { Router } from "express";
import { createUser, getUsers } from "../controller/userController";
import validate from "../middleware/requestValidator";
import { createUserDto } from "../dto/userDto";

const router: Router = Router();

router.post("/", validate(createUserDto), createUser);
router.get("/", getUsers);

export default router;
