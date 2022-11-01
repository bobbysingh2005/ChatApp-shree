import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { sendTo } from '../Home';
import { AppSetting } from './Default-layout';

export default function InputBox () {
const {app, message, users, ws} = useContext(AppSetting);
const [text, setText] = useState("");

useEffect(()=>{
},[message.msg])

return (
<>
<Form
onSubmit={(ev)=>{
ev.preventDefault();
let { name, value} = ev.target.msg;
let user = users.selected;
let data = {
    date: new Date(),
    user: { name: app.userName },
    text: value
};
message.update({ type: "add", msg: data});
sendTo(ws, { type: "answer", id: user.id, userName: user.name, message: value});
setText("");
}}
>
<Form.Group controlId="msg" >
<Form.Control
type="text"
name="msg"
value={text}
onChange={(ev)=>setText(ev.target.value)}
/>
</Form.Group>
<Button type="submit" >Send</Button>
</Form>
</>
)}
