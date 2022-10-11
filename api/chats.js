const shortid = require('shortid');
const { WebSocketServer } = require('ws');
const _ = require('lodash');

/**
* web socket main function
*/
function ChatJs (server) {

const wss = new WebSocketServer({ server: server});

let count = 0;
let users = {};

/* prepare user list  */

wss.on('connection', function (ws){
count++;
let id = shortid.generate();
ws.id = id;

ws.on("message", (message)=>{
try{
let msg = JSON.parse(message);
switch (msg.type) {

case "register_user":
let data;
let isExists = _.filter(users, (o)=> o.user.name===msg.userName);
if(isExists.length===0){
ws.user = { id: id, name: msg.userName};
ws.myGroup = {};
users[id] = ws;
data = { type: 'server_response', success: true, userName: msg.userName, message: 'connection is ready'};
console.log(`register user: ${msg.userName}`)
}else{
data = { type: 'server_response', success: false, message: `Sorry user name ${msg.userName} already taken by other person, use othername or try again.`};
console.log(`register user: ${msg.userName}`)
};//endIf;
setTimeout(()=>{
ws.send(JSON.stringify(data))
}, 500)
break;

case "update_users":
console.log(`request update users list`)
let list = (cId)=>{
let list = {};
let totalList = Object.keys(users);
list = _.map(users, (val, i)=>{
if(val.id!==cId) return { id: val.id, name: val.user.name};
})
return { type: "update_users", users: list };
};//end;
_.map(users, async (val, i)=>{
val.send(JSON.stringify(list(val.id)));
});//end;
// ws.send(JSON.stringify(userList));
break;

case "join_request":
console.log(`join request: ${msg.user.name}`)
users[msg.user.id].send(JSON.stringify({ type: "join_request", user: users[id].user, message: `request to join your group, user: ${users[id].user.name}`}))
break;

case "join_response":
console.log(`join response ${users[msg.id].user.name} has ${msg.accept ? "accept":"reject"}`);
if(msg.accept){

let old = users[id].myGroup;
let oldOther = users[msg.id].myGroup;
if(old && old.id) users[old.id].send(JSON.stringify({ type: "close", user: users[id].user, message: `${users[id].user.name} has close connection`}))
if(oldOther && oldOther.id) users[oldOther.id].send(JSON.stringify({ type: "close", user: users[msg.id].user, message: `${users[msg.id].user.name} has close connection`}))

users[id].myGroup = users[msg.id].user;
users[msg.id].myGroup = users[id].user;
setTimeout(()=>users[msg.id].send(JSON.stringify({ type: "accept", user: users[id].user, message: `${users[id].user.name} is accept your request`})), 300);
setTimeout(()=>users[id].send(JSON.stringify({ type: "accept", user: users[msg.id].user, message: `${users[id].user.name} start to chat`})), 300);
}else{
users[msg.id].send(JSON.stringify({ type: "reject", message: `${users[id].user.name} is reject your request`}))
};//endIf;
_.map(users, (val,i)=>{
// if(val.id!==id||val.id!==msg.id) users[val.id].send(JSON.stringify({ type: "refresh"}))
})
// iam = _.filter(users[id].myGroup, [ "id", msg.id ]);
// other = _.filter(users[msg.id].myGroup, [ "id", id ]);
// console.log(`iam: ${JSON.stringify(iam)} - other: ${JSON.stringify(other)}`);
break;

case "answer":
    users[msg.id].send(JSON.stringify({ type: "answer", user: users[id].user, message: msg.message }));
break;

default:
break;
}

}catch(err){
console.log(err)
}});//end;

ws.on('close', function (){
count--;
console.log(`connection is close: ${ws.id}`);
delete users[ws.id]
});//endClose;
});//end;


};//endConnection;


module.exports = ChatJs;