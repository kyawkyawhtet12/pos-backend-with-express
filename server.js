import express from "express";
import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
import userRoutes from "./src/users/users.route.js";
import branchesRoutes from "./src/branches/branches.route.js";
import brandRoutes from "./src/brands/brands.routes.js";
import { Router } from "express";
import ExpressFormidable from "express-formidable";
import fileUpload from "express-fileupload";


const routes = Router();


const app = express();
const port = process.env.PORT || 5000;


app.use(ExpressFormidable(
    {
        encoding: 'utf-8',
        multiples: true, 
    }
));
app.use(fileUpload())




app.use('/user/', userRoutes)
app.use('/branch', branchesRoutes);
app.use('/brand', brandRoutes);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})