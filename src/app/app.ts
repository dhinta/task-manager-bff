import express from "express";
import bodyParser from "body-parser";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { user } from "./modules/user";
import Logger from "./libs/logger";

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

        this.app.use("/user", user.route);

        this.forceSecure();
        this.routes();
    }

    forceSecure() {
        this.app.use((req: express.Request, res: express.Response, next: Function) => {
            if (req.secure) {
                next();
            } else {
                res.redirect('https://localhost:3000');
            }
        });
    }

    routes() {
        // API ROOT
        this.app.get("/", (req: express.Request, res: express.Response) => {
            Logger.log({
                level: 'info',
                message: 'Unauthorized access attempt in root url'
            });
            res.status(403).end();
        });
    }

    serve() {
        let options = {
            key: fs.readFileSync(path.resolve('src/ssl-key/private.key')),
            cert: fs.readFileSync(path.resolve('src/ssl-key/certificate.crt'))
        }
        // Secure Server
        https.createServer(options, this.app).listen(this.port);
        // Non Secure Server
        http.createServer(this.app).listen(3001);
    }
}

const app = new App();
app.configure();
app.serve();