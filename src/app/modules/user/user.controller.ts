import express = require("express");

class UserController {

    constructor () {

    }

    login (req: express.Request, res: express.Response) {
        // res.send("User login");
        if (req.params.email === "relaxed.dhinta@gmail.com" && req.params.password === "123456") {
            res.send({
                data: {
                    success: true,
                    messages: []
                }
            })
        } else {
            res.send({
                data: {
                    success: false,
                    messages: ["loginFailed"]
                }
            })
        }
    }
}

export const controller = new UserController();