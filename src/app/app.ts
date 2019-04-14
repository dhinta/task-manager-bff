import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import AppConfig from './configs/app.config';
import Logger from './libs/logger';
import { user } from './modules/user';

class App {
    public app: express.Application;
    public port: string | number = process.env.port || 3000;

    constructor() {
        this.app = express();
    }

    configure() {
        this.app.set('port', this.port);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.forceSecure();
        this.routes();
    }

    forceSecure() {
        this.app.use((req: express.Request, res: express.Response, next: () => void) => {
            if (req.secure) {
                next();
            } else {
                res.redirect(AppConfig.baseUrl);
            }
        });
    }

    routes() {
        // API ROOT
        this.app.get(AppConfig.baseApiPath, (req: express.Request, res: express.Response) => {
            Logger.log({
                level: 'info',
                message: 'Unauthorized access attempt in root url'
            });
            res.status(403).end();
        });
        // Validation Rules Route
        this.app.get(AppConfig.baseApiPath + '/validationRules', (req: express.Request, res: express.Response) => {
            fs.readFile (path.resolve('src/data/validation-rules.json'), (err: NodeJS.ErrnoException, data: Buffer) => {
                if (err) {
                    console.log('handle error'); // TODO: Error Handling
                }
                res.send(JSON.parse(data.toString()));
            });
        });
        // User Routes
        this.app.use(AppConfig.baseApiPath + '/user', user.route);
    }

    serve() {
        const options = {
            key: fs.readFileSync(path.resolve('src/secure/ssl-private.key')),
            cert: fs.readFileSync(path.resolve('src/secure/ssl-certificate.crt'))
        };
        // Secure Server
        https.createServer(options, this.app).listen(this.port);
        // Non Secure Server
        http.createServer(this.app).listen(3001);
    }
}

const app = new App();
app.configure();
app.serve();
