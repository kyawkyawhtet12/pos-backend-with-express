import { Router } from "express";
import { brandController } from "./brands.controller.js";


const brandRoutes = Router();

brandRoutes.get('/', brandController.getAllBrands);
brandRoutes.post('/create', brandController.createBrand);


export default brandRoutes;
