import { assertType, FieldType } from "./FieldType";

class XmlDeserializationHelper{
    assertField = <T> (xml : Element, field : string, type : FieldType<T>) => {
        const elements = xml.getElementsByTagName(field);
        if(elements.length === 0){
            throw new Error(`Field ${field} did not exist.`);
        }
        const rawValue = elements[0].textContent;
        const value = assertType(rawValue, type);
        return value;
    }

    assertOptionalField = <T> (xml : Element, field : string, type : FieldType<T>) => {
        let value = undefined;
        const elements = xml.getElementsByTagName(field);
        if(elements.length > 0){
            value = this.assertField(xml, field, type);
        }
        return value;
    }

    assertOptionalNullField = <T> (xml : Element, field : string, type : FieldType<T>) => {
        const optionalValue = this.assertOptionalField(xml, field, type);
        return (optionalValue != null)?(optionalValue):(null);
    }

    assertArray = <T> (xml : Element, field : string, handler : (xml : Element) => T) => {
        const array : T[] = [];
        const elements = xml.getElementsByTagName(field);
        for(const element of elements){
            array.push(handler(element));
        }
        return array;
    }
}
export default new XmlDeserializationHelper();