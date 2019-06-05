import express from 'express';
import { BaseRouter } from '../base/base.router';
import { controller } from './project.controller';

class ProjectRoutes extends BaseRouter {

    private publicUrls: string[];
    constructor() {
        super();
        this.publicUrls = [];
        // Middleware
        this.intercept(this.publicUrls);
        this.routes();
    }

    routes() {
        this.route.get('/dashboard', (req: express.Request, res: express.Response) => {
            controller.dashboard(req, res);
        });
    }
}

export const objRoute: ProjectRoutes = new ProjectRoutes();
