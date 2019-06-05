import express from 'express';
import { BaseRouter } from '../base/base.router';
import { controller } from './user.controller';

class UserRoutes extends BaseRouter {

    private publicUrls: string[];
    constructor() {
        super();
        this.publicUrls = ['/login'];
        // Middleware
        this.intercept(this.publicUrls);
        this.routes();
    }

    routes() {
        this.route.get('/', (req: express.Request, res: express.Response) => {
            controller.index(req, res);
        });
        this.route.post('/login', (req: express.Request, res: express.Response) => {
            controller.login(req, res);
        });
        this.route.get('/signout', (req: express.Request, res: express.Response) => {
            controller.logout(req, res);
        });
    }
}

export const objRoute: UserRoutes = new UserRoutes();
