import { Router } from "express";
import validate from "../middleware/requestValidator";
import { loginUserDto } from "../dto/userDto";
import auth from "../controller/authController";

const router: Router = Router();

router.post("/", validate(loginUserDto), auth);

export default router;
