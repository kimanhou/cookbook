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

    @OneToMany(type => Instruction, instruction => instruction["recipe"], {eager : true, cascade : true})
    private instructions : Instruction[];

    @OneToMany(type => Ingredient, ingredient => ingredient["recipe"], {eager : true, cascade : true})
    private ingredients : Ingredient[];

    constructor(id : Nullable<number>, recipeName : string, instructions : Instruction[], ingredients : Ingredient[]) {
        this.id = id;
        this.recipeName = recipeName;
        this.instructions = instructions;
        this.ingredients = ingredients;
    }

    static deserialize = (json : any) => {
        const id = JsonDeserializationHelper.assertOptionalNullField(json, "id", FieldType.NUMBER);
        const recipeName = JsonDeserializationHelper.assertField(json, "recipeName", FieldType.STRING);
        const instructions = JsonDeserializationHelper.assertField(json, "instructions", FieldType.ARRAY(Instruction.deserialize));
        const ingredients = JsonDeserializationHelper.assertField(json, "ingredients", FieldType.ARRAY(Ingredient.deserialize));

        return new Recipe(id, recipeName, instructions, ingredients);
    }

    static createRecipe = (recipeName : string, instructions : Instruction[], ingredients : Ingredient[]) => {
        return new Recipe(null, recipeName, instructions, ingredients);
    }

    getId = () => this.id!;
    getRecipeName = () => this.recipeName;
    getInstructions = () => this.instructions;
    getIngredients = () => this.ingredients;
}