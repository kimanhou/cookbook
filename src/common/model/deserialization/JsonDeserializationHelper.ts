import { FieldType } from "./FieldType";

class JsonDeserializationHelper {
    assertField = <IT, OT> (json : any, field : string, type : FieldType<IT, OT>) => {
        const rawValue = json[field];
        if(rawValue == null){
            throw new Error(`Field ${field} did not exist.`);
        }
        const value = type.assertType(rawValue);
        return value;
    }

    assertOptionalField = <IT, OT> (json : any, field : string, type : FieldType<IT, OT>) => {
        let value = undefined;
        const rawValue = json[field];
        if(rawValue != null){
            value = this.assertField(json, field, type);
        }
        return value;
    }

    assertOptionalNullField = <IT, OT> (json : any, field : string, type : FieldType<IT, OT>) => {
        const optionalValue = this.assertOptionalField(json, field, type);
        return (optionalValue != null)?(optionalValue):(null);
    }

    assertOptionalUndefinedField = <IT, OT> (json : any, field : string, type : FieldType<IT, OT>) => {
        const optionalValue = this.assertOptionalField(json, field, type);
        return (optionalValue != undefined) ? (optionalValue) : (undefined);
    }
}
export default new JsonDeserializationHelper();