import {createConnection} from "typeorm";
import Recipe from "../../common/model/Recipe";

const databaseConnectionGetter = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "cookbook",
    entities: [Recipe]
});
export default databaseConnectionGetter;