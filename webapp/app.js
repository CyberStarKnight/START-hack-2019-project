const express = require("express");
const routes = require('./server/routes/');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
let {PythonShell} = require('python-shell')
const env = process.env.NODE_ENV || 'development';
console.log("Node env: " + env);

const app = express();
const router = express.Router();

let port = process.env.PORT || 5000;
const pythonFolder = '/'

var options = {
  mode: 'text',
  // make sure this is your local path to Python
  pythonPath: '/usr/local/bin/python', 
  pythonOptions: ['-u'],
  scriptPath: process.cwd(),
  args: ['argument1', 'argument2', 'argument3'] 
};  

console.log("mydir: " + process.cwd());

PythonShell.run('hello.py', options, function (err, result) {
  if (err) throw err; 
  console.log('finished: ' + result);
});
/** set up routes {API Endpoints} */
routes(router);

//gzip client js and css
app.use(compression());

/** set up middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use('/api', router);

/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});