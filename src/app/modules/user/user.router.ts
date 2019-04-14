import express from 'express';
import { controller } from './user.controller';

class UserRoutes {

    public route: express.Router;

    constructor() {
        this.route = express.Router({
            caseSensitive: true
        });
        this.routes();
    }

    routes() {
        this.route.get('/', (req: express.Request, res: express.Response) => res.status(403).end());
        this.route.get('/login', (req: express.Request, res: express.Response) => {
            controller.login(req, res);
        });
    }
}

export const objRoute: UserRoutes = new UserRoutes();
