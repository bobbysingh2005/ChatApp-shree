import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Author from "../utils/author";
import Chat from "./chat";
import Login from "./login";
import SideBar from "./sidebar";

var ws: any;

function Home() {
const [users, updateUsers] = useState(false);
const [to, updateTo] = useState(false);
const [chats, updateChat] = useState<any>([]);
const [author, updateAuthor] = useState(false);

const init = async () => {
ws = new WebSocket(`ws://localhost:8080/`);
ws.onopen = () => console.log(`WebSocket connected`);
ws.onclose = () => console.log(`WebSocket disconnected`);

ws.onmessage = (msg: any) => {
if (checkIsJson(msg.data)) {
let data = JSON.parse(msg.data);
switch (data.type) {
case "server_login":
if (data.success) {
Author.set(data.name);
updateAuthor(data.name);
} else {
alert("sorry user name already taken");
} //endif;
break;

case "answer":
let msg = {
date: new Date().toISOString(),
...data,
}; //end;
updateChat((obj: any)=> [...chats, msg]);
// alert(JSON.stringify(msg))
break;

case "update_userlist":
setTimeout(() => updateUsers(data.name), 200);
break;
default:
break;
} //endSwitch;
} else {
console.log("Message is Not JSON", msg);
} //endIf;
}; //end;
}; //endINIT;

function sendTo(msg: any) {
let data = JSON.stringify(msg);
if (ws) ws.send(data);
} //end;

function addChat(to: any, from: string, message: any | undefined) {
let pare = to + "_" + author;
let cc: any = { to: to, from: from, message: message };
let msg = "1";
updateChat(msg);
} //end;

useEffect(() => {
if (!author) init();
//eslint-disable-next-line
}, [author]);

if (!author) return <Login sendTo={sendTo} ws={ws} />;
return (
<>
<SideBar to={to} users={users} change={updateTo} />
<Chat to={to} chats={chats} send={sendTo} />
</>
);
} //end;

function checkIsJson(msg: any) {
try {
JSON.parse(msg);
return true;
} catch (err: any) {
console.log("error: " + err);
return false;
}
} //end;

export default Home;
