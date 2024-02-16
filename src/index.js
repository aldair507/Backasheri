import express from "express";
import morgan from "morgan";
import userRouter from "./routes/routes.routes.js"
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/",userRouter)

const port = 3000; // You should define the port you want to listen on

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
