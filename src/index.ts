import { Response, Request } from "express";
import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";
import { ConnectToDB } from "./config/connectDB";
import RightsRouter from "./routers/rights.router";
import UserRouter from "./routers/user.router";


const app = express();

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



app.use(bodyParser.json());
ConnectToDB();

app.get("/", async (req: Request, res: Response): Promise<any> => {
    res.send("hello world this is test")
    ConnectToDB();
})


app.use("/api/rights", RightsRouter);
app.use("/api/user", UserRouter);



app.listen(1000, () => {
    console.log("server running on port 1000")
});
