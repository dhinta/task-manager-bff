import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

class AuthToken {
    constructor() { }

    generate(data: any) {
        try {
            const privateKey: Buffer = fs.readFileSync(path.resolve('src/secure/jwtRS256.key'));
            return jwt.sign(data, privateKey.toString(), {
                algorithm: 'RS256',
                expiresIn: 1440
            });
        } catch (e) {
            console.log(e); // TODO: Error Handling
        }
    }

    verify(token: string, callback: (err: any, decoded: any) => void) {
        const privateKey: Buffer = fs.readFileSync(path.resolve('src/secure/jwtRS256.key.pub'));
        const result = jwt.verify(token, privateKey, {
            algorithms: ['RS256']
        });
        callback(null, result);
    }
}

export default new AuthToken();
