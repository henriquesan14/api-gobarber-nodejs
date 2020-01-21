import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import databaseConfig from '../config/database';
import mongoose from 'mongoose';

const models = [User, File, Appointment];

class Database {
    constructor(){
        this.init();
        this.mongo();
    }

    init(){
        this.connetion = new Sequelize(databaseConfig);
        models
        .map(model => model.init(this.connetion))
        .map(model => model.associate && model.associate(this.connetion.models));
    }

    mongo(){
        this.mongoConnetion = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
    }
}

export default new Database();
