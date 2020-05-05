import { Request, Response } from "express";
import { Connection } from "typeorm";
import Recipe from "../../../common/model/Recipe";
import IController from "../IController";
import Ingredient from "../../../common/model/Ingredient";
import Instruction from "../../../common/model/Instruction";

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
            // .then(recipe => {
            //     const ingredients = recipe.getIngredients();
            //     ingredients.forEach(t => { t.setRecipeId(recipe.getId()) });
            //     return this.connection.getRepository(Ingredient).save(ingredients)
            //         .then(() => recipe);
            // })
            // .then(recipe => {
            //     const instructions = recipe.getInstructions();
            //     instructions.forEach(t => { t.setRecipeId(recipe.getId()) });
            //     return this.connection.getRepository(Instruction).save(instructions)
            //         .then(() => recipe);
            // })
            .then(recipe => res.send(recipe));
    }
}