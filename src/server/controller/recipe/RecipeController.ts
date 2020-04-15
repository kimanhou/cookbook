import IController from "../IController";
import { Request, Response } from "express";
import { Connection } from "typeorm";
import Recipe from "../../../common/model/Recipe";

export default class RecipeController implements IController{
    endpoint = "/api/recipes/:id"

    private connection : Connection;

    constructor(connection : Connection){
        this.connection = connection;
    }
    
    get = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.connection.getRepository(Recipe).findOne(id)
            .then(recipe => res.send(recipe));
    }

    delete = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.connection.getRepository(Recipe).delete(id)
            .then(() => res.send());
    }
}