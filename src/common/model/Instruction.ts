import {Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Nullable } from '../Types';
import JsonDeserializationHelper from './deserialization/JsonDeserializationHelper';
import { FieldType } from './deserialization/FieldType';
import Recipe from './Recipe';

@Entity()
export default class Instruction {
    @PrimaryGeneratedColumn()
    private id : Nullable<number>;

    @Column("int")
    private recipeId : Nullable<number>;

    @Column("int")
    private stepNumber : number;

    @Column("text")
    private text : string;

    @ManyToOne(type => Recipe, recipe => recipe["instructions"], {onDelete:"CASCADE"})
    private recipe ?: Recipe;

    constructor(id : Nullable<number>, recipeId : Nullable<number>, stepNumber : number, text : string) {
        this.id = id;
        this.recipeId = recipeId;
        this.stepNumber = stepNumber;
        this.text = text;
    }

    static deserialize = (json : any) => {
        const id = JsonDeserializationHelper.assertOptionalNullField(json, "id", FieldType.NUMBER);
        const recipeId = JsonDeserializationHelper.assertOptionalNullField(json, "recipeId", FieldType.NUMBER);
        const stepNumber = JsonDeserializationHelper.assertField(json, "stepNumber", FieldType.NUMBER);
        const text = JsonDeserializationHelper.assertField(json, "text", FieldType.STRING);

        return new Instruction(id, recipeId, stepNumber, text);
    }

    static createInstruction = (id : Nullable<number>, recipeId : number, stepNumber : number, text : string) => {
        return new Instruction(id, recipeId, stepNumber, text);
    }

    toString = () => `${this.stepNumber}. ${this.text}`;

    getId = () => this.id
    getRecipeId = () => this.recipeId;
    getStepNumber = () => this.stepNumber;
    getText = () => this.text;

    setId = (id : Nullable<number>) => this.id = id;
    setRecipeId = (recipeId : Nullable<number>) => this.recipeId = recipeId;
    setStepNumber = (stepNumber : number) => this.stepNumber = stepNumber;
    setText = (text : string) => this.text = text;

    sync = (data : Instruction) => {
        this.id = data.id;
        this.recipeId = data.recipeId;
        this.text = data.text;
        this.stepNumber = data.stepNumber;
    }
}