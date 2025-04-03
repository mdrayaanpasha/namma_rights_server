import { Router } from "express";
import { GetListRights, GetRightQuestions } from "../controllers/rights.controller";


const RightsRouter = Router();

RightsRouter.get('/list-rights',GetListRights);
RightsRouter.get('/rights-questions/:right',GetRightQuestions);

export default RightsRouter;