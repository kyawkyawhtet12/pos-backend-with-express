// import { User } from "./users.service";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



const {user} = new PrismaClient();
const saltRounds = 10;


const register = async (req, res) => {
    const emailExit = await user.findFirst({
        where: {
            email:req.body.email,
        },
    });

    if (emailExit){
        return res.send('Email Already Used');
    }
    const phoneExit = await user.findFirst({
        where: {
            phone: req.body.phone,
        }
    });
    if(phoneExit){
        return res.send("Phone Already Used");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password,salt);

    const newUser = await user.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            Branch:{
                connect: {
                    id: parseInt(req.body.branchId)
                }
            }
        }
    });

    if(newUser){
        return res.send(newUser);
    }
}

const login = async (req, res) => {
    console.log(req.body);
    const emailExit = await user.findFirst({
        where:{
            email: req.body.email,
        }
    })
    if(!emailExit){
        return res.send('Email Does Not Exist');
    }else{
        const checkPassword = bcrypt.compare(req.body.password, emailExit.password)
        if(checkPassword){
            const token = jwt.sign(
                {id: emailExit.id.toString()},
                process.env.TOKEN_SECRET || QWERTY,
                {expiresIn: "1hr"}
            );
            return res.send(token);
        }else{
            return res.send("Wrong Password");
        }
    }
}

export const UserController = {register, login}