import { PrismaClient } from "@prisma/client";


const { branch } = new PrismaClient();

const getAllBranches = async (req, res) => {
    const branches = await branch.findMany();

    return res.send(branches);
}

const createBranch = async (req, res) => {
    try {
        const createdBranch = await branch.create({
            data: {
                name: req.body.name,
                address: req.body.address,
                phoneMM: req.body.phoneMM,
                phoneTH: req.body.phoneTH,
            }
        });
        res.send(createdBranch);
    } catch (error) {
        if(error) res.send(error);
    }

}

const updateBranch = async (req, res) => {
    try {
        const updatedBranch = await branch.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: {
                name: req.body.name,
                address: req.body.address,
                phoneMM: req.body.phoneMM,
                phoneTH: req.body.phoneTH,
            }
        })

        res.send(updatedBranch);
    } catch (error) {
        if(error){
            res.send(error);
        }
    }
}


const deleteBranch =async (req, res) => {
    try {
        const deletedBranch = await branch.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.send("Deleted Successfully");
    }catch (error){
        if(error){
            return res.send(error);
        }
    }
}


export const branchController = { getAllBranches, createBranch, updateBranch, deleteBranch}