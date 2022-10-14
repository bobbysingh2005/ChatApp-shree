import _ from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppSetting } from './components/Default-layout';

import InputBox from './components/Input-box';
import Messages from './components/messages';
import VideoBox from './components/Video-box';

export default function Home (){
const {app, users, message, ws} = useContext(AppSetting);
const navigate = useNavigate();
const [isReady, setReady] = useState(false);
const [cameraOnOff, setCamera] = useState(false);

//toggle function for video on/off
const cameraToggle = ()=>setCamera(!cameraOnOff);
const chat = async (ws)=>{
ws.onmessage = ({ data })=>{
let msg = JSON.parse(data);
switch (msg.type){
case "server_response":
if(msg.success){
setTimeout(sendTo(ws, { type: "update_users"}), 500);
}else{
alert(msg.message)
};//endIf;
break;

case "update_users":
if(msg.users) {
setTimeout(users.update({ type: "set", list: msg.users}), 500);
};//endIf;
break;

case "join_request":
let isYes = window.confirm(msg.message);
if(isYes) {
sendTo(ws, { type: "join_response", id: msg.user.id, user: msg.user, accept: true})
} else {
sendTo(ws, { type: "join_response", id: msg.user.id, user: msg.user, accept: false});
};//endIf;
break;

case "accept":
users.update({ type: "set", selected: msg.user})
message.update({ type: "clean"});
sendTo(ws, { type: "update_users"})
break;
case "reject":
message.update({ type: "clean"});
alert(JSON.stringify(msg))
break;
case "refresh":
sendTo(ws, { type: "update_users"})
break;

case "close":
users.update({ type: "set", selected: false});
message.update({ type: "clean"});
alert(msg.message);
sendTo(ws, {type:"update_users"})
break;

case "answer":
let data = {
date: new Date(),
user: msg.user,
text: msg.message
};
setTimeout(()=>message.update({ type: "add", msg: data}),500);
break;

case "pc_offer":
alert("pc_offer = "+JSON.stringify(msg))
break;
case "pc_answer":
alert("pc_answer "+JSON.stringify(msg))
break;
};//endSwitch;
};//end;
if(!app.isWsConnect){
ws.send(JSON.stringify({ type: "register_user", userName: app.userName}));
}
};//end;

function sendTo (conn, msg){
let data = JSON.stringify(msg);
conn.send(data)
}

useEffect(()=>{
if(app.isLogin){
if(isReady){
chat(ws);
};//endIf;
setReady(true)
}else{
navigate("/login")
}
},[isReady])
return (
<>
<h1>home</h1>
{users.selected ? (<h2>Chat to: {users.selected.name}</h2>): ""}
{cameraOnOff ? (<VideoBox toggle={cameraToggle} sendTo={sendTo} />) : (<Button type="button" onClick={cameraToggle} >Start Video</Button>)}
<Messages />
<InputBox sendTo={sendTo} />
</>
)};//end;

