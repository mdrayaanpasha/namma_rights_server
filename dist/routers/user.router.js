"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_contoller_1 = require("../controllers/user.contoller");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/user-guidance", user_contoller_1.userGuidance);
UserRouter.post("/police-protocol", user_contoller_1.policeProtocol);
exports.default = UserRouter;
