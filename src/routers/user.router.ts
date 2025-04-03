import { Router } from "express";
import {  policeProtocol, userGuidance } from "../controllers/user.contoller";

const UserRouter = Router();

UserRouter.post("/user-guidance",userGuidance);
UserRouter.post("/police-protocol",policeProtocol);

export default UserRouter;