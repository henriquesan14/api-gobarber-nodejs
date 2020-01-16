import { Router } from 'express';
import User from './app/models/user';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Henrique',
        email: 'henrique@gmail.com',
        password_hash: '1233456'
    })
    res.json(user);
});
export default routes;
