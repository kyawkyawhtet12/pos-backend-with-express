import { branchController } from "./branches.controller.js";
import authenticate from "../middleware/authMiddleware.js";
import { Router } from "express";


const branchesRoutes = Router();

branchesRoutes.get("/", authenticate,branchController.getAllBranches);
branchesRoutes.post("/create", authenticate,branchController.createBranch);
branchesRoutes.put("/update", authenticate,branchController.updateBranch);
branchesRoutes.delete("/delete/:id", authenticate,branchController.deleteBranch);


export default branchesRoutes;