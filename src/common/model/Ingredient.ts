import {Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Nullable } from '../Types';
import JsonDeserializationHelper from './deserialization/JsonDeserializationHelper';
import { FieldType } from './deserialization/FieldType';
import Recipe from './Recipe';

@Entity()
export default class Ingredient {
    @PrimaryGeneratedColumn()
    private id : number | undefined;

    @Column("int")
    private recipeId : Nullable<number>;

    @Column("text")
    private name : string;

    @Column("double")
    private quantity : number;

    @Column("text")
    private unity : string;

    @ManyToOne(type => Recipe, recipe => recipe["ingredients"], {onDelete:"CASCADE"})
    private recipe ?: Recipe;

    constructor(id : number | undefined, recipeId : Nullable<number>, name : string, quantity : number, unity : string) {
        this.id = id;
        this.recipeId = recipeId;
        this.name = name;
        this.quantity = quantity;
        this.unity = unity;
    }

    static deserialize = (json : any) => {
        const id = JsonDeserializationHelper.assertOptionalUndefinedField(json, "id", FieldType.NUMBER);
        const recipeId = JsonDeserializationHelper.assertOptionalNullField(json, "recipeId", FieldType.NUMBER);
        const name = JsonDeserializationHelper.assertField(json, "name", FieldType.STRING);
        const quantity = JsonDeserializationHelper.assertField(json, "quantity", FieldType.NUMBER);
        const unity = JsonDeserializationHelper.assertField(json, "unity", FieldType.STRING);

        return new Ingredient(id, recipeId, name, quantity, unity);
    }

    static createIngredient = (id : number | undefined, recipeId : number, name : string, quantity : number, unity : string) => {
        return new Ingredient(id, recipeId, name, quantity, unity);
    }

    toString = () => `${this.quantity}${this.unity} ${this.name}`;

    getId = () => this.id
    getRecipeId = () => this.recipeId;
    getName = () => this.name;
    getQuantity = () => this.quantity;
    getUnity = () => this.unity;

    setId = (id : number | undefined) => this.id = id;
    setRecipeId = (recipeId : Nullable<number>) => this.recipeId = recipeId;
    setName = (name : string) => this.name = name;
    setQuantity = (quantity : number) => this.quantity = quantity;
    setUnity = (unity : string) => this.unity = unity;

    sync = (data : Ingredient) => {
        this.id = data.id;
        this.recipeId = data.recipeId;
        this.name = data.name;
        this.quantity = data.quantity;
        this.unity = data.unity;
    }
}