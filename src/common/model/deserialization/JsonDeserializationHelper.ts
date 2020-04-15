import { FieldType, assertType } from "./FieldType";
import { isArray } from "util";

class JsonDeserializationHelper {
    assertField = <T> (json : any, field : string, type : FieldType<T>) => {
        const rawValue = json[field];
        if(rawValue == null){
            throw new Error(`Field ${field} did not exist.`);
        }
        const value = assertType(rawValue, type);
        return value;
    }

    assertOptionalField = <T> (json : any, field : string, type : FieldType<T>) => {
        let value = undefined;
        const rawValue = json[field];
        if(rawValue != null){
            value = this.assertField(json, field, type);
        }
        return value;
    }

    assertOptionalNullField = <T> (json : any, field : string, type : FieldType<T>) => {
        const optionalValue = this.assertOptionalField(json, field, type);
        return (optionalValue != null)?(optionalValue):(null);
    }

    assertArray = <T> (json : any, field : string, handler : (json : any) => T) => {
        const array : T[] = [];
        const elements = json[field];
        if(elements == null || !isArray(elements)){
            throw new Error(`Field ${field} was not an array.`);
        }
        for(const element of elements){
            array.push(handler(element));
        }
        return array;
    }
}
export default new JsonDeserializationHelper();