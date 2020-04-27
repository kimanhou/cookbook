import { Request, Response } from "express";
import { Connection } from "typeorm";
import Ingredient from "../../../common/model/Ingredient";
import IController from "../IController";

export default class IngredientController implements IController{
    endpoint = "/api/ingredients/:id"

    private connection : Connection;

    constructor(connection : Connection){
        this.connection = connection;
    }
    
    get = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.connection.getRepository(Ingredient).findOne(id)
            .then(ingredient => res.send(ingredient));
    }

    delete = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.connection.getRepository(Ingredient).delete(id)
            .then(() => res.send());
    }
}