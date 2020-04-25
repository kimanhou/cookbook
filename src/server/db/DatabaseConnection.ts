import {createConnection} from "typeorm";
import Recipe from "../../common/model/Recipe";
import Ingredient from "../../common/model/Ingredient";
import Instruction from "../../common/model/Instruction";

const databaseConnectionGetter = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "cookbook",
    entities: [Recipe, Ingredient, Instruction],
    //logging: true
});
export default databaseConnectionGetter;