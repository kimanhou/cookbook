export class FieldType<T>{
    static STRING = new FieldType<string>();
    static NUMBER = new FieldType<number>();
    static BOOLEAN = new FieldType<boolean>();
    static DATE = new FieldType<Date>();

}

const castToString = (value : any) => {
    if(typeof value === 'string'){
        return value;
    }
    throw new Error(`${value} is not a string.`);
}

const castToNumber = (value : any) => {
    if(typeof value === 'string'){
        const floatValue = parseFloat(value);
        if(isNaN(floatValue)){
            throw new Error(`${value} is not a number.`)
        }
        return floatValue;
    }
    if(typeof value === 'number'){
        return value;
    }
    throw new Error(`${value} is not a number.`);
}

const castToBoolean = (value : any) => {
    if(typeof value === 'string'){
        if(value.toLowerCase() === "true"){
            return true;
        }
        if(value.toLowerCase() === "false"){
            return false;
        }
        throw new Error(`${value} is not a boolean.`);
    }
    if(typeof value === 'boolean'){
        return value;
    }
    throw new Error(`${value} is not a boolean.`);
}

const castToDate = (value : any) => {
    if(typeof value === 'string'){
        const numericDate = Date.parse(value);
        if(isNaN(numericDate)){
            throw new Error(`${value} is not a date.`)
        }
        return new Date(numericDate);
    }
    if(typeof value === 'object'){
        if(value instanceof Date){
            return value;
        }
    }
    throw new Error(`${value} is not a date.`);
}

const castToObject = (value : any, throwOnString ?: boolean) : any => {
    if(typeof value === 'string'){
        if(throwOnString === true){
            throw new Error(`${value} is not an object.`);
        }
        return castToObject(JSON.parse(value), true);
    }
    if(typeof value === 'object'){
        return value;
    }
    throw new Error(`${value} is not an object.`);
}

const castToArray = (value : any, throwOnString ?: boolean) : any[] => {
    if(typeof value === 'string'){
        if(throwOnString === true){
            throw new Error(`${value} is not an array.`);
        }
        return castToArray(JSON.parse(value), true);
    }
    if(typeof value === 'object'){
        if(Array.isArray(value)){
            return value;
        }
    }
    throw new Error(`${value} is not an array.`);
}

export const assertType = <T> (value : any, type : FieldType<T>) => {
    switch(type){
        case FieldType.STRING:
            value = castToString(value);
            break;
        case FieldType.NUMBER:
            value = castToNumber(value);
            break;
        case FieldType.BOOLEAN:
            value = castToBoolean(value);
            break;
        case FieldType.DATE:
            value = castToDate(value);
            break;
    }
    return value as T;
}