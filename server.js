import express from "express";
import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
import userRoutes from "./src/users/users.route.js";
import { Router } from "express";

const routes = Router();


const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user/', userRoutes)

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})