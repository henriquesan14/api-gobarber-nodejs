import File from '../models/File';

class FileController {
    async store(req, res){
        const { key: name, location: path } = req.file;
        const file = await File.create({
            name,
            path
        });
        return res.json({
            id: file.id,
            name: file.name,
            path: file.path
        });
    }
}

export default new FileController();


