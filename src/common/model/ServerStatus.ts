export default class ServerStatus{
    constructor(){

    }

    static deserialize = (dto : any) => {
        return new ServerStatus();
    }
}