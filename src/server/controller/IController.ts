import { RequestHandler } from "express";
import { Connection } from "typeorm";

export default interface IController{
    readonly endpoint : string;
    
    get ?: RequestHandler;
    post ?: RequestHandler;
    put ?: RequestHandler;
    patch ?: RequestHandler;
    delete ?: RequestHandler;
}

export type ConnectionControllerConstructor<T> = new (connection : Connection) => T;