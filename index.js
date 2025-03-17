import express from 'express';

const app = express();

app.use((req, res, next) =>{
    if(!req.get('Authorization'))
    {
        const err = new Error('Not authenticated!');
        res.status(401).set('WWW-Authenticate', 'Basic');
        next(err);
    }
    else{
        const cred = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
        .toString().split(':');

        const username = cred[0];
        const password = cred[1];

        if (!(username === 'admin' && password === 'admin123'))
        {
            const err = new Error('Not authenticated!');
            res.status(401).set('WWW-Authenticate', 'Basic');
            next(err);
        }
        res.status(200);
        next();
    }

})

app.get('/', (req, res) =>{
    res.send('Protected oldal')
})

app.listen(3000);