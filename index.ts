const * as express = require('express');
const * as https = require('https');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const cors = require('cors');

dotenv.config();

const serverOptions = {
    // key: fs.readFileSync('./certification/key.pem', 'utf8'),
    // cert: fs.readFileSync('./certification/cert.pem', 'utf8')
      key: fs.readFileSync(__dirname+ './key.pem', 'utf8'),
      cert: fs.readFileSync(__dirname+ './server.crt', 'utf8')
}
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const mode = process.env.MODE || 'development';
// const publicPath = (process.env.MODE == 'development') ? path.join(__dirname, '../', 'public') : __dirname;

const app = express();
const server = https.createServer(serverOptions, app);
const wss = new WebSocket.Server({ server })

  app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(logger('tiny'))

// app.options('*', cors());

// app.use(express.static(publicPath))
app.post('/api/login', (req, res)=>{
let {userName} = req.body;
console.log(`user Name: ${userName} `);
if(users[userName]) return res.status(404).json({ success: false, message: 'user name already taken!'})
users[userName] = 'pending';
res.status(200).json({ success: true, message: 'login successfully'});
});//endPostLogin;

let count: number = 0;
let users: any = {};
let room: any = [];

export interface iMsg {
  type: string
  name?: string
  message?: string
  data?: any
};
export interface iWs extends WebSocket {
  name?: any
  otherName?: string|null|boolean
  status?: string
};

wss.on('connection', (ws: iWs)=>{
count++;
console.log("new user connected, total users: "+count);
ws.onmessage = (msg: iMsg)=>{
let data = JSON.parse(msg.data);
switch (data.type) {

case 'initial':
if(users[data.name]==='pending'){
users[data.name] = ws;
ws.name = data.name;
ws.otherName = null;
ws.status = 'active';
sendTo(ws, {type: 'server_initial', success: true});
console.log(`${data.name} connected and initial complete`)
updateUserList();
}else if(users[data.name]){
sendTo(ws, {type: 'server_initial', success: true});
console.log(`${data.name} reinitial complete`)
updateUserList();
}else{
sendTo(ws, {type: 'server_initial', success: false, msg: 'initial faile'});
};//endIf;
break;


default:
break;
};//endSwitch;
};//endOnMessage;

function updateUserList () {
let allUsers = Object.keys(users);
let x: any = "";
for(x in users){
let msg: any = {type: 'update_userlist', name: allUsers};
// msg = JSON.stringify(msg);
sendTo(users[x], msg)
};//endFor;
console.log(`user updated list...`)
};//end;

ws.onclose = ()=>{
count--;
console.log(`user ${ws.name} is disconnected, active users: ${count}`)
delete users[ws.name];
updateUserList();
};//endOnClose;

});//endWss;

function sendTo (conn: any, msg: any){
const data = JSON.stringify(msg);
if(conn && conn.send) conn.send(data);
};//end;

server.listen(port, ()=>console.log(`Server start port: ${port}
press ctrl + c to exit`));