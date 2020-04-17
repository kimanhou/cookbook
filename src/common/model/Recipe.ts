import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Nullable } from '../Types';
import JsonDeserializationHelper from './deserialization/JsonDeserializationHelper';
import { FieldType } from './deserialization/FieldType';
import Ingredient from './Ingredient';

@Entity()
export default class Recipe{
    @PrimaryGeneratedColumn()
    private id : Nullable<number>;

    @Column("text")
    private recipeName : string;

    @Column("text")
    private instructions : string;

    @OneToMany(type => Ingredient, ingredient => ingredient["recipe"], {eager : true, cascade : true})
    private ingredients : Ingredient[];

    constructor(id : Nullable<number>, recipeName : string, instructions : string, ingredients : Ingredient[]){
        this.id = id;
        this.recipeName = recipeName;
        this.instructions = instructions;
        this.ingredients = ingredients;
    }

    static deserialize = (json : any) => {
        const id = JsonDeserializationHelper.assertOptionalNullField(json, "id", FieldType.NUMBER);
        const recipeName = JsonDeserializationHelper.assertField(json, "recipeName", FieldType.STRING);
        const instructions = JsonDeserializationHelper.assertField(json, "instructions", FieldType.STRING);
        const ingredients = JsonDeserializationHelper.assertField(json, "ingredients", FieldType.ARRAY(Ingredient.deserialize));

        return new Recipe(id, recipeName, instructions, ingredients);
    }

    static createRecipe = (recipeName : string, instructions : string, ingredients : Ingredient[]) => {
        return new Recipe(null, recipeName, instructions, ingredients);
    }

    getId = () => this.id;
    getRecipeName = () => this.recipeName;
    getInstructions = () => this.instructions;
    getIngredients = () => this.ingredients;
}