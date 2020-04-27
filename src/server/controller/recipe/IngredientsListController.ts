import { Request, Response } from "express";
import { Connection } from "typeorm";
import Ingredient from "../../../common/model/Ingredient";
import IController from "../IController";

export default class IngredientsListController implements IController {
    endpoint = "/api/ingredients/"

    private connection : Connection;

    constructor(connection : Connection){
        this.connection = connection;
    }

    post = (req: Request, res: Response) => {
        const ingredient = Ingredient.deserialize(req.body);
        this.connection.getRepository(Ingredient).save(ingredient)
            .then(Ingredient => res.send(Ingredient));
    }
}