import express from "express"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import router from "../routes/auth.js"
import session from "express-session"
import Mongo from "connect-mongo"
import cors from "cors"
import router2 from "../routes/message.js"
import { app, server } from "../utils/socket.js"
// import { app, server } from "../utils/socket.js"
import path from "path"



dotenv.config({ path: "D:\\Mayank Data\\CODING\\MERN Projects\\Chat Express\\server\\.env" });
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected To Mongo DB")
}).catch((e)=>{
    console.log("Mongo DB Connection Error: ", e)
})


const PORT = process.env.PORT;
const __dirname = path.resolve();

// const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(session({
    secret: "thisisthesecretofexpress-session",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*1000*60*2,
        secure: false,
        httpOnly: true
    },
    store: Mongo.create({
        client: mongoose.connection.getClient()
    })
}))

app.use(express.json())
app.use("/api/auth", router);
app.use("/api/messages", router2)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client", "dist")))
    app.use("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}


server.listen(PORT, ()=>{
    console.log(`Listening On The PORT: ${PORT}`)
})