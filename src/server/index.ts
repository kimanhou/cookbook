import express from 'express';
import ServerStatus from '../common/model/ServerStatus';
import bodyParser from 'body-parser';
import "reflect-metadata";
import databaseConnectionGetter from './db/DatabaseConnection';
import ControllerRegistry from './controller/ControllerRegistry';

const app = express();

databaseConnectionGetter
    .then(databaseConnection => databaseConnection.synchronize().then(() => databaseConnection))
    .then(databaseConnection => {
    
    app.use(express.static('dist'));
    app.use(bodyParser.json());
    app.get('/api/status', (req, res) => res.send(new ServerStatus()));
    
    ControllerRegistry.registerControllers(app, databaseConnection);

    // KEEP LAST
    app.get('*', (req,res) =>{
        res.sendFile('dist/index.html');
    });
    app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
})