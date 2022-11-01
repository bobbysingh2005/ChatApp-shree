const shortid = require('shortid');
const { WebSocketServer } = require('ws');
const _ = require('lodash');

/**
* web socket main function
*/
function ChatJs(server) {

const wss = new WebSocketServer({ server: server });

let count = 0;
let users = {};

/* prepare user list  */

wss.on('connection', function (ws) {
count++;
let id;
ws.id = id;

ws.on("message", (message) => {
try {
let msg = JSON.parse(message);
switch (msg.type) {

case "register_user":
let data;
// let isExists = _.indexOf(users, (o) => o.id === msg.id || o.user.name === msg.userName);
let isExists = _.indexOf(users, (o) => o.id === msg.id);
console.log(isExists)
if (isExists === -1) {
id = shortid.generate();
ws.id = id;
ws.user = { id: id, name: msg.userName };
ws.myGroup = [];
users[id] = ws;
data = { type: 'login', success: true, user: { id: id, userName: msg.userName}, message: 'connection is ready' };
console.log(`register user: ${msg.userName}`)
} else if(isExists.id===msg.id){
    data = { type: 'login', success: true, user: { id: id, userName: msg.userName}, message: 'connection is ready' };
} else {
data = { type: 'login', success: false, message: `Sorry user name ${msg.userName} already taken by other person, use othername or try again.` };
console.log(`register user: ${msg.userName}`)
return ws.send(JSON.stringify(data))
};//endIf;

ws.send(JSON.stringify(data))
break;

case "update_users":
console.log(`request update users list`)
let list = (cId) => {
let list = {};
let totalList = Object.keys(users);
list = _.map(users, (val, i) => {
if (val.id !== cId) return { id: val.id, name: val.user.name };
})
return { type: "update_users", users: list };
};//end;
_.map(users, async (val, i) => {
val.send(JSON.stringify(list(val.id)));
});//end;
// ws.send(JSON.stringify(userList));
break;

case "join_request":
console.log(`join request: ${msg.user.name}`)
users[msg.user.id].send(JSON.stringify({ type: "join_request", user: users[id].user, message: `request to join your group, user: ${users[id].user.name}` }))
break;

case "join_response":
console.log(`join response ${users[msg.id].user.name} has ${msg.accept ? "accept" : "reject"}`);
if (msg.accept) {
console.log('r: 1')
let old = users[id].myGroup;
let oldOther = users[msg.id].myGroup;
console.log('r: 2')
if (old && old.id) {
if(users[old.id])
users[old.id].send(JSON.stringify({ type: "close", user: users[id].user, message: `${users[id].user.name} has close connection` }))
};//endIf;
console.log('r: 2.5')
if (oldOther && oldOther.id) {
users[oldOther.id].send(JSON.stringify({ type: "close", user: users[msg.id].user, message: `${users[msg.id].user.name} has close connection` }))
};//endIf;
console.log('r: 3')
users[id].myGroup = users[msg.id].user;
users[msg.id].myGroup = users[id].user;
console.log('r: 4')
users[msg.id].send(JSON.stringify({ type: "accept", user: users[id].user, message: `${users[id].user.name} is accept your request` }))
users[id].send(JSON.stringify({ type: "accept", user: users[msg.id].user, message: `${users[id].user.name} start to chat` }))
console.log('r: 5')
} else {
users[msg.id].send(JSON.stringify({ type: "reject", message: `${users[id].user.name} is reject your request` }))
};//endIf;
break;

case "answer":
users[msg.id].send(JSON.stringify({ type: "answer", user: users[id].user, message: msg.message }));
break;

case "pc_offer":
let pcOffer = {
type: "pc_offer",
id: id,
pcOffer: msg.offer
};
console.log(pcOffer)
users[msg.id].send(JSON.stringify(pcOffer))
break;

case "pc_answer":
let pcAnswer = {
type: "pc_answer",
id: id,
pcAnswer: msg.answer
};
console.log(pcAnswer)
users[msg.id].send(JSON.stringify(pcAnswer))
break;
case "iceCandidate":
console.log(`send iceCandidate by ${users[id].user.name}`)
setTimeout(
_.map(users, (usr, i) => {
usr.send(JSON.stringify({ type: "icecandidate", iceCandidate: msg.iceCandidate }))
console.log(`iceCandidate recive to ${usr.user.name}`)
}), 300);
break;
default:
break;
}

} catch (err) {
console.log(err)
}
});//end;

ws.on('close', function () {
count--;
console.log(`connection is close: ${ws.id}`);
if(users[id]) {
let close_user = users[id].user;
_.map(users, (usr, i) => {
if (users[usr.id].send) users[usr.id].send(JSON.stringify({ type: "close", message: `${close_user.name} has logOut` }))
});//endMap;
};//endIf;
delete users[ws.id]
});//endClose;
});//end;


};//endConnection;


module.exports = ChatJs;