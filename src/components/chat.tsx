import * as React from 'react';
import { Button, Form, FormGroup } from "react-bootstrap";


function Messages (props: any) {
return (
<div>
<h3>Message</h3>
{!props.list ? "No Message" :
(<ul>
{props.list.map((val: any, i: number)=>{
let {date, to, from, answer} = val;
return (
<li key={i} >
name: {to} - 
to: {to} - 
from: {from} - 
answer: {answer}
</li>
)
})}
</ul>)}
</div>
)};//endMessages;

function Chat (props: any) {

function onSubmit (ev: any) {
ev.preventDefault();
let data = {
    type: 'answer',
    to: props.to,
    answer: ev.target.msg.value
};//end;
// alert(JSON.stringify(data))
props.send(data)
};//endOnSubmit;
React.useEffect(()=>{
alert(JSON.stringify(props.chats,null,2))
},[props.chats])

return (
<main>
<h2>Chat to {props.to}</h2>
<div aria-label='Chat'>
<Messages to={props.to} list={props.chats} />
</div>
<Form onSubmit={onSubmit} >
<FormGroup>
<Form.Label>Message</Form.Label>
<Form.Control
type="textarea" 
name="msg"
/>
</FormGroup>
<Button
type="submit"
>Send</Button>
</Form>
</main>
)};//end;

export default Chat;