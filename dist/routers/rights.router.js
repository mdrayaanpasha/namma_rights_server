"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rights_controller_1 = require("../controllers/rights.controller");
const RightsRouter = (0, express_1.Router)();
RightsRouter.get('/list-rights', rights_controller_1.GetListRights);
RightsRouter.get('/rights-questions/:right', rights_controller_1.GetRightQuestions);
exports.default = RightsRouter;
