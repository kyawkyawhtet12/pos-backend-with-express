import { PrismaClient } from "@prisma/client";
import fileUpload from "express-fileupload";
import path from "path";


const { brand } = new PrismaClient();

const getAllBrands =  async (req, res) => {
    const brands = await brand.findMany();

    return res.send(brands);
}

const createBrand = async (req, res) => {

    const file = req.files.image;
    console.log(file);
    const path = __dirname + "/files/" + file.name;
  
    file.mv(path, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  
    const createdBrand  = await brand.create({
        data: {
            name: req.body.name,
            image: file,
        }
    });

    res.send(createdBrand);
}


export const brandController  = { getAllBrands , createBrand}