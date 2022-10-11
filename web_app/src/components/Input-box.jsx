import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AppSetting } from './Default-layout';

function InputBox ({ sendTo}) {
const {app, message, users, ws} = useContext(AppSetting);
const [text, setText] = useState("");

useEffect(()=>{
// alert(JSON.stringify(message.message))
},[message.message])

return (
<>
<Form
onSubmit={(ev)=>{
ev.preventDefault();
let { name, value} = ev.target.msg;
let user = users.users.selected;
let data = {
    date: new Date().toLocaleString(),
    user: { name: app.setting.userName },
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

export default InputBox;