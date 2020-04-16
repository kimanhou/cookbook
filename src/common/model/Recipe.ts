import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Nullable } from '../Types';
import JsonDeserializationHelper from './deserialization/JsonDeserializationHelper';
import { FieldType } from './deserialization/FieldType';

@Entity()
export default class Recipe{
    @PrimaryGeneratedColumn()
    id : Nullable<number>;

    @Column("text")
    recipeName : string;

    @Column("text")
    instructions : string;

    constructor(id : Nullable<number>, recipeName : string, instructions : string){
        this.id = id;
        this.recipeName = recipeName;
        this.instructions = instructions;
    }

    static deserialize = (json : any) => {
        const id = JsonDeserializationHelper.assertOptionalNullField(json, "id", FieldType.NUMBER);
        const recipeName = JsonDeserializationHelper.assertField(json, "recipeName", FieldType.STRING);
        const instructions = JsonDeserializationHelper.assertField(json, "instructions", FieldType.STRING);

        return new Recipe(id, recipeName, instructions);
    }

    static createRecipe = (recipeName : string, instructions : string) => {
        return new Recipe(null, recipeName, instructions);
    }
}