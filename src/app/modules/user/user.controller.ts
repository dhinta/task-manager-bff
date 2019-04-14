import authToken from '../../libs/jwt';
import express from 'express';
import Logger from '../../libs/logger';

const user = {
    id: '145453523',
    name: 'Debasish Chowdhury',
    email: 'relaxed.dhinta@gmail.com',
    password: '123456'
}

class UserController {

    constructor() {

    }

    login(req: express.Request, res: express.Response) {
        Logger.log({
            level: 'info',
            message: 'UserController::login'
        });
        if (req.query.email === user.email && req.query.password === user.password) {
            Logger.log({
                level: 'info',
                message: 'UserController::login::Valid Credentials'
            });
            const oUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            const token = authToken.generate(oUser);
            console.log(token);
            res.send({
                data: {
                    success: true,
                    messages: []
                }
            });
        } else {
            Logger.log({
                level: 'info',
                message: 'UserController::login::Invalid Credentials'
            });
            res.send({
                data: {
                    success: false,
                    messages: ['loginFailed']
                }
            });
        }
    }
}

export const controller = new UserController();
