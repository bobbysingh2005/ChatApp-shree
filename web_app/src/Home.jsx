import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSetting } from './components/Default-layout';

import InputBox from './components/Input-box';
import Messages from './components/messages';
import VideoChat, { VideoPlayer } from './hooks/Hook-video';

export default function Home() {
const { app, users, message, ws } = useContext(AppSetting);
const navigate = useNavigate();
const [isReady, setReady] = useState(false);

const chat = async (ws) => {
ws.onmessage = ({ data }) => {
let msg = JSON.parse(data);
switch (msg.type) {
case "login":
if (msg.success===true) {
window.sessionStorage.setItem("author", JSON.stringify(msg.user));
setTimeout(sendTo(ws, { type: "update_users" }), 500);
} else {
window.sessionStorage.removeItem('author')
};//endIf;
alert(msg.success)
break;

case "update_users":
if (msg.users) {
setTimeout(users.update({ type: "set", list: msg.users }), 500);
};//endIf;
break;

case "join_request":
let isYes = window.confirm(msg.message);
if (isYes) {
sendTo(ws, { type: "join_response", id: msg.user.id, user: msg.user, accept: true })
} else {
sendTo(ws, { type: "join_response", id: msg.user.id, user: msg.user, accept: false });
};//endIf;
break;

case "accept":
users.update({ type: "set", selected: msg.user })
message.update({ type: "clean" });
sendTo(ws, { type: "update_users" })
break;
case "reject":
message.update({ type: "clean" });
alert(JSON.stringify(msg))
break;
case "refresh":
sendTo(ws, { type: "update_users" })
break;

case "close":
users.update({ type: "set", selected: false });
message.update({ type: "clean" });
alert(msg.message);
sendTo(ws, { type: "update_users" })
break;

case "answer":
let data = {
date: new Date(),
user: msg.user,
text: msg.message
};
setTimeout(() => message.update({ type: "add", msg: data }), 500);
break;
default:
break;
};//endSwitch;
};//end;

if (!app.isWsConnect) {
let author = (window.sessionStorage.getItem('author')) ? JSON.parse(window.sessionStorage.getItem('author')) : false;
    if(author) ws.send(JSON.stringify({ type: "register_user", id: author.id, userName: author.userName }));
else ws.send(JSON.stringify({ type: "register_user", userName: app.userName }));
}
};//end;



useEffect(() => {
if (app.isLogin) {
if (isReady) {
chat(ws);
};//endIf;
setReady(true)
} else {
navigate("/login")
}
}, [isReady])

return (
<>
<h1>home</h1>
{users.selected ? (<h2>Chat to: {users.selected.name}</h2>) : ""}
<VideoChat sendTo={sendTo} />
<Messages />
<InputBox />
</>
)};//endHome;

export function sendTo(conn, msg) {
let data = JSON.stringify(msg);
conn.send(data)
};//endSendTo;


