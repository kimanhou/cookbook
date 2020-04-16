import {createConnection} from "typeorm";
import Recipe from "../../common/model/Recipe";
import Ingredient from "../../common/model/Ingredient";

const databaseConnectionGetter = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "cookbook",
    entities: [Recipe, Ingredient]
});
export default databaseConnectionGetter;