import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Nullable } from '../Types';
import JsonDeserializationHelper from './deserialization/JsonDeserializationHelper';
import { FieldType } from './deserialization/FieldType';

@Entity()
export default class Note{
    @PrimaryGeneratedColumn()
    id : Nullable<number>;

    @Column("text")
    text : string;

    constructor(id : Nullable<number>, text : string){
        this.id = id;
        this.text = text;
    }

    static deserialize = (json : any) => {
        const id = JsonDeserializationHelper.assertOptionalNullField(json, "id", FieldType.NUMBER);
        const text = JsonDeserializationHelper.assertField(json, "text", FieldType.STRING);

        return new Note(id, text);
    }

    static createNote = (text : string) => {
        return new Note(null, text);
    }
}