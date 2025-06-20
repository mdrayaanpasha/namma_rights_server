import { Response, Request } from "express";
import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";
import { ConnectToDB } from "./config/connectDB";
import RightsRouter from "./routers/rights.router";
import UserRouter from "./routers/user.router";


const app = express();

app.use(cors())


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


export default app;