import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

class UserController {
    async store(req, res){
        const userExist = await User.findOne({
            where: {email: req.body.email}
        });
        if(userExist){
            return res.status(400).json({error: 'User already exists.'});
        }
        const {id, name, email, provider} = await User.create(req.body);

        if(provider){
            await Cache.invalidate('providers');
        }
        return res.json({
            id,
            name, email, provider
        });
    }

    async update(req, res){
        const { email, oldPassword } = req.body;
        const user = await User.findByPk(req.userId);
        if(email != user.email){
            const userExist = await User.findOne({
                where: {email: email}
            });
            if(userExist){
                return res.status(400).json({error: 'User already exists.'});
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({error: 'Password does not match'});
        }

        await user.update(req.body);
        const {id, name, avatar, provider } = await User.findByPk(req.userId, {
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url']
                }
            ]
        });
        return res.json({
            id,
            name,
            email,
            provider,
            avatar
        });
    }
}

export default new UserController();
