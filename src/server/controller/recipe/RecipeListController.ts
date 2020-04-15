import IController from "../IController";
import { Request, Response } from "express";
import { Connection } from "typeorm";
import Recipe from "../../../common/model/Recipe";

export default class RecipeListController implements IController{
    endpoint = "/api/recipes"

    private connection : Connection;

    constructor(connection : Connection){
        this.connection = connection;
    }

    get = (req: Request, res: Response) => {
        this.connection.getRepository(Recipe).find()
            .then(recipes => res.send(recipes));
    }

    post = (req: Request, res: Response) => {
        const recipe = Recipe.deserialize(req.body);
        this.connection.getRepository(Recipe).save(recipe)
            .then(recipe => res.send(recipe));
    }
}