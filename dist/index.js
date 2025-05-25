"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connectDB_1 = require("./config/connectDB");
const rights_router_1 = __importDefault(require("./routers/rights.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log("Origin:", req.headers.origin);
    res.header("Access-Control-Allow-Origin", "https://nammarights.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://nammarights.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});
app.use(body_parser_1.default.json());
(0, connectDB_1.ConnectToDB)();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("hello world this is test");
    (0, connectDB_1.ConnectToDB)();
}));
app.use("/api/rights", rights_router_1.default);
app.use("/api/user", user_router_1.default);
app.listen(1000, () => {
    console.log("server running on port 1000");
});
