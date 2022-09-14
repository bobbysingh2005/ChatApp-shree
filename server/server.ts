import https from 'https';
import http from 'http';
import fs from 'fs';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import WebSocket from 'ws';
import cors from 'cors';
import appRootPath from 'app-root-path';
import ReactDomServer from 'react-dom/server';

const rootPath = appRootPath ? appRootPath : './';

dotenv.config({
path: `${rootPath}/.env`
});

const serverOptions = {
// key: fs.readFileSync('./certification/key.pem', 'utf8'),
// cert: fs.readFileSync('./certification/cert.pem', 'utf8')
key: fs.readFileSync(`${rootPath}/key.pem`, 'utf8'),
cert: fs.readFileSync(`${rootPath}/server.crt`, 'utf8')
}

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const mode = process.env.MODE || 'development';

const app = express();
// const server = https.createServer(serverOptions, app);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

let count: number = 0;
let users: any = {};
let room: any = [];


app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(logger('tiny'))

app.use(express.static( mode==="development" ? `${rootPath}/dist` : `${rootPath}/`))

app.get('*', (req: Request, res: Response, next: NextFunction)=>{
return res.status(200).sendFile(mode==="develoment" ? rootPath+'/dist/index.html' : rootPath+'/index.html');
});//end;Get;

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
if(isJasonData(msg.data)) {
let data = JSON.parse(msg.data);
switch (data.type) {

case 'login':
if(!users[data.name]){
setTimeout(()=>{
users[data.name] = ws;
ws.name = data.name;
ws.otherName = null;
ws.status = 'active';
sendTo(ws, {type: 'server_login', success: true, name: data.name});
updateUserList();
},600);
console.log(`${data.name} connected and login complete`)
}else{
sendTo(ws, {type: 'server_login', success: false, msg: 'login faile'});
};//endIf;
break;

case "offer":
break;

case "offer_accept":
break;

case "offer_reject":
break;

case 'answer':
console.log(data)
let {to, answer} = data;
const conn = users[to];
const from = ws.name;
sendTo(conn, {type: "answer", to: to, from: from, answer: answer})
break;

default:
break;
};//endSwitch;
}else{
console.log("message not json")
};//endIf;
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

function isJasonData (msg: any){
try{
JSON.parse(msg);
return true;
}catch (err){
console.log(`error: ${err}`);
return false;
}
};//end;

server.listen(port, ()=>console.log(`Server start port: ${port}
Mode: ${mode}
press ctrl + c to exit
Application path: ${appRootPath}
`));
