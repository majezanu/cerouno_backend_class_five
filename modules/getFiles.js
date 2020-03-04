import fs from 'fs';
import path from 'path';
let files = [];

const getFiles = () => {
    let folderPath = path.join(__dirname +'/../public/images/');
    const fileNames = fs.readdirSync(folderPath);
    files = fileNames.map(item => {
        return {
            file: item,
            qty: 0,
            url: '/gallery/'+item+'/downlaod',
            previewPath: '/images/'+item
        }
    })
    return files;
};

const getFile = (fileName) => {
    let file = files.find(file => file.file === fileName);
    file.qty = file.qty + 1;
    return file;
}

export default {getFiles, getFile}