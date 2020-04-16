import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm';
import { Nullable } from '../Types';
import JsonDeserializationHelper from './deserialization/JsonDeserializationHelper';
import { FieldType } from './deserialization/FieldType';

@Entity()
export default class Ingredient {
    @PrimaryColumn()
    recipeId : number;

    @Column("text")
    name : string;

    @Column("text")
    quantity : number;

    constructor(recipeId : number, name : string, quantity : number){
        this.recipeId = recipeId;
        this.name = name;
        this.quantity = quantity;
    }

    static deserialize = (json : any) => {
        const recipeId = JsonDeserializationHelper.assertField(json, "recipeId", FieldType.NUMBER);
        const name = JsonDeserializationHelper.assertField(json, "name", FieldType.STRING);
        const quantity = JsonDeserializationHelper.assertField(json, "quantity", FieldType.NUMBER);

        return new Ingredient(recipeId, name, quantity);
    }

    static createRecipe = (recipeId : number, name : string, quantity : number) => {
        return new Ingredient(recipeId, name, quantity);
    }
}