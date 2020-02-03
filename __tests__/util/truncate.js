import database from '../../src/database';


export default function truncate(){
    return Promise.all(
        Object.keys(database.connetion.models).map(key => {
            return database.connetion.models[key].destroy({ truncate: true, force: true});
        })
    );
}
