import express from 'express';
import authToken from '../../libs/jwt';

export class BaseRouter {
    public app: express.Application;
    public route: express.Router;

    constructor() {
        this.app = express();

        this.route = express.Router({
            caseSensitive: true
        });
    }

    intercept(noVerifyUrls: string[]) {
        this.route.use((req: express.Request, res: express.Response, next: () => void) => {
            if (this.isPublic(noVerifyUrls, req.url)) {
                next();
            } else {
                const token = req.cookies.authToken;
                authToken.verify(token, (err: any, decoded: any) => {
                    this.verifyToken(err, decoded, res, next);
                });
            }
        });
    }

    isPublic(noVerifyUrls: string[], currentUrl: string): boolean {
        const url = currentUrl.split('?')[0];
        return (noVerifyUrls.indexOf(url) > -1);
    }

    verifyToken(err: any, decoded: any, res: express.Response, next: () => void) {
        if (err) {
            res.clearCookie('authToken', { path: '/' });
            res.send({
                data: {
                    success: false,
                    logout: true
                }
            });
            return;
        }
        res.locals.user = decoded;
        next();
    }
}
