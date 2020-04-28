import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Nullable } from '../Types';
import JsonDeserializationHelper from './deserialization/JsonDeserializationHelper';
import { FieldType } from './deserialization/FieldType';
import Instruction from './Instruction';
import Ingredient from './Ingredient';

@Entity()
export default class Recipe{
    @PrimaryGeneratedColumn()
    private id : Nullable<number>;

    @Column("text")
    private recipeName : string;

    @Column("int")
    private numberOfServings : number;

    @Column("text")
    private time : string;

    @Column("simple-array")
    private cookware : string[];

    @OneToMany(type => Instruction, instruction => instruction["recipe"], {eager : true, cascade : true})
    private instructions : Instruction[];

    @OneToMany(type => Ingredient, ingredient => ingredient["recipe"], {eager : true, cascade : true})
    private ingredients : Ingredient[];

    constructor(id : Nullable<number>, recipeName : string, numberOfServings : number, time : string, 
        instructions : Instruction[], ingredients : Ingredient[], cookware : string[]) {
        this.id = id;
        this.recipeName = recipeName;
        this.numberOfServings = numberOfServings;
        this.time = time;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.cookware = cookware;
    }

    static deserialize = (json : any) => {
        const id = JsonDeserializationHelper.assertOptionalNullField(json, "id", FieldType.NUMBER);
        const recipeName = JsonDeserializationHelper.assertField(json, "recipeName", FieldType.STRING);
        const numberOfServings = JsonDeserializationHelper.assertField(json, "numberOfServings", FieldType.NUMBER);
        const time = JsonDeserializationHelper.assertField(json, "time", FieldType.STRING);
        const instructions = JsonDeserializationHelper.assertField(json, "instructions", FieldType.ARRAY(Instruction.deserialize));
        const ingredients = JsonDeserializationHelper.assertField(json, "ingredients", FieldType.ARRAY(Ingredient.deserialize));
        const cookware = JsonDeserializationHelper.assertField(json, "cookware", FieldType.ARRAY(json => json as string));

        return new Recipe(id, recipeName, numberOfServings, time ,instructions, ingredients, cookware);
    }

    static createRecipe = (recipeName : string, numberOfServings : number, time : string, 
        instructions : Instruction[], ingredients : Ingredient[], cookware : string[]) => {
        return new Recipe(null, recipeName, numberOfServings, time, instructions, ingredients, cookware);
    }

    getId = () => this.id!;
    getRecipeName = () => this.recipeName;
    getNumberOfServings = () => this.numberOfServings;
    getTime = () => this.time;
    getInstructions = () => this.instructions;
    getIngredients = () => this.ingredients;
    getCookware = () => this.cookware;
    getCookwareToString = () => this.cookware.join(', ');

    setTime = (time : string) => this.time = time;
    setNumberOfServings = (numberOfServings : number) => this.numberOfServings = numberOfServings;
    setCookwareAt = (cookware : string, index : number) => this.cookware[index] = cookware;
    setCookware = (cookwares : string[]) => this.cookware = cookwares;
    setIngredients = (ingredients : Ingredient[]) => this.ingredients = ingredients;

    addIngredient = (ingredient : Ingredient) => {
        ingredient.setRecipeId(this.id);
        this.ingredients = [... this.ingredients, ingredient];
    }

    sync = (data : Recipe) => {
        this.id = data.id;
        this.recipeName = data.recipeName;
        this.numberOfServings = data.numberOfServings;
        this.time = data.time;
    }
}