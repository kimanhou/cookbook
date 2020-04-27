import { Request, Response } from "express";
import { Connection } from "typeorm";
import Instruction from "../../../common/model/Instruction";
import IController from "../IController";

export default class InstructionController implements IController{
    endpoint = "/api/instructions/:id"

    private connection : Connection;

    constructor(connection : Connection){
        this.connection = connection;
    }
    
    get = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.connection.getRepository(Instruction).findOne(id)
            .then(instruction => res.send(instruction));
    }

    delete = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.connection.getRepository(Instruction).delete(id)
            .then(() => res.send());
    }
}