import express from 'express';
import fs from 'fs';
import path from 'path';
import Logger from '../../libs/logger';

class ProjectController {

    constructor() {

    }

    dashboard(req: express.Request, res: express.Response) {
        Logger.info('ProjectController::dashboard::Send Project Data');
        const projects = this.loadProjectData().toString();
        res.send({
            data: projects ? JSON.parse(projects) : projects
        });
    }

    loadProjectData(): Buffer {
        try {
            return fs.readFileSync(path.resolve('src/data/projects-data.json'));
        } catch {
            console.log('error parsing project data');
        }
        return Buffer.from('');
    }
}

export const controller = new ProjectController();
