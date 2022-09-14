import * as React from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Author from '../utils/author';

function Login (props: any) {
async function onSubmit (ev: any) {
ev.preventDefault();
let { name, value} = ev.target.Email; 
let { sendTo} = props;
if(value!=="") {
let msg: any = {};
msg.type = 'login';
msg.name = value;
// alert(JSON.stringify(msg))
sendTo(msg);
}else {
console.log('Login Faild')
};//endIf;
};//end;

useEffect(()=>{
//eslint-disable-next-line
},[]);

return (
<Container>
<Row>
<Col>
<h1>Login</h1>
</Col>
</Row>
<Row>
<Col>
<Form onSubmit={onSubmit}>
<Form.Group>
<Form.Label>Email: </Form.Label>
<Form.Control name="Email" type="text" placeholder="Enter email" autoFocus={true} />
</Form.Group>
<Button variant="primary" type="submit" >Login</Button>
</Form>
</Col>
</Row>
</Container>
)}

export default Login;
