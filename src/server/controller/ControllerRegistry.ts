import NoteListController from "./note/NoteListController";
import NoteController from "./note/NoteController";
import IController, { ConnectionControllerConstructor } from "./IController";
import * as core from "express-serve-static-core";
import { Connection } from "typeorm";

class ControllerRegistry{
    controllerKlasses : ConnectionControllerConstructor<IController>[] = [
        NoteListController,
        NoteController
    ]

    registerControllers = (app: core.Express, connection : Connection) => {
        const controllers = this.controllerKlasses.map(ctr => new ctr(connection));
        for(let controller of controllers){
            if(controller.get != null){
                app.get(controller.endpoint, controller.get);
            }
            if(controller.patch != null){
                app.patch(controller.endpoint, controller.patch);
            }
            if(controller.put != null){
                app.put(controller.endpoint, controller.put);
            }
            if(controller.post != null){
                app.post(controller.endpoint, controller.post);
            }
            if(controller.delete != null){
                app.delete(controller.endpoint, controller.delete);
            }
        }
    }
}
export default new ControllerRegistry();