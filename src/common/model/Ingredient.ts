import {Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Nullable } from '../Types';
import JsonDeserializationHelper from './deserialization/JsonDeserializationHelper';
import { FieldType } from './deserialization/FieldType';
import Recipe from './Recipe';

@Entity()
export default class Ingredient {
    @PrimaryGeneratedColumn()
    private id : Nullable<number>;

    @Column("int")
    private recipeId : Nullable<number>;

    @Column("text")
    private name : string;

    @Column("text")
    private quantity : number;

    @ManyToOne(type => Recipe, recipe => recipe["ingredients"], {onDelete:"CASCADE"})
    private recipe ?: Recipe;

    constructor(id : Nullable<number>, recipeId : Nullable<number>, name : string, quantity : number) {
        this.id = id;
        this.recipeId = recipeId;
        this.name = name;
        this.quantity = quantity;
    }

    static deserialize = (json : any) => {
        const id = JsonDeserializationHelper.assertOptionalNullField(json, "id", FieldType.NUMBER);
        const recipeId = JsonDeserializationHelper.assertOptionalNullField(json, "recipeId", FieldType.NUMBER);
        const name = JsonDeserializationHelper.assertField(json, "name", FieldType.STRING);
        const quantity = JsonDeserializationHelper.assertField(json, "quantity", FieldType.NUMBER);

        return new Ingredient(id, recipeId, name, quantity);
    }

    static createRecipe = (id : Nullable<number>, recipeId : number, name : string, quantity : number) => {
        return new Ingredient(id, recipeId, name, quantity);
    }

    toString = () => `${this.quantity} ${this.name}`;

    getId = () => this.id
    getRecipeId = () => this.recipeId;
    getName = () => this.name;
    getQuantity = () => this.quantity;
}