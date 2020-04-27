import { Request, Response } from "express";
import { Connection } from "typeorm";
import Instruction from "../../../common/model/Instruction";
import IController from "../IController";

export default class InstructionsListController implements IController {
    endpoint = "/api/instructions"

    private connection : Connection;

    constructor(connection : Connection){
        this.connection = connection;
    }

    post = (req: Request, res: Response) => {
        const instruction = Instruction.deserialize(req.body);
        this.connection.getRepository(Instruction).save(instruction)
            .then(Instruction => res.send(Instruction));
    }
}