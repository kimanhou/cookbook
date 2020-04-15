import {createConnection} from "typeorm";
import Note from "../../common/model/Note";

const databaseConnectionGetter = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "notes",
    entities: [Note]
});
export default databaseConnectionGetter;