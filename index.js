import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import pug from 'pug';
import filesManager from './modules/getFiles';
import path from 'path';

dotenv.config();
const env = process.env;
const app = express();

app.set('views', 'views')
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let fileNames = filesManager.getFiles();

app.get('/', (req,res)=>{
    res.render('home', {title: 'Home'});
});

app.get('/gallery', (req, res) => {
    res.render('images', {files: fileNames});
});

app.get('/gallery/:filename/downlaod', (req, res) => {
    let file = filesManager.getFile(req.params.filename); 
    let url = path.join(__dirname + '/public/images/'+file.file);
    res.sendFile(url);
});

app.listen(env.PORT, (req, res) => {
    console.log(`Server running on port: ${env.PORT}`);
    console.log('Press Ctrl + C for stop server');
});