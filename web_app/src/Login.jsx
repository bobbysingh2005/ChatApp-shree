import React, { useContext, useEffect } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AppSetting } from './components/Default-layout';

const Login = () => {
const navigate = useNavigate();
const {app} = useContext(AppSetting);

useEffect(()=>{
},[]);

return (
<Container>
<Row>
<Col>
<Card>
<Card.Header>
Member Login
</Card.Header>
<Card.Body>
<Formik
initialValues={{
    userName: "",
}}
validationSchema={Yup.object().shape({
    userName: Yup.string().required('User name is required')
})}
onSubmit={ async (values)=>{
try{
await app.update({type: "set", userName: values.userName, isLogin: true});
    navigate('/home')
}catch(error){
alert(error)
}
}}
>
{({ errors, values, handleChange, handleBlur, handleSubmit})=>(
<Form onSubmit={handleSubmit} noValidate>
<Form.Group controlId='userName'>
<Form.Label id="userName" >User: </Form.Label>
<Form.Control 
type="text" 
name="userName"
placeholder="enter user name"
onChange={handleChange}
value={values.userName}
autoFocus
/>
</Form.Group>
</Form>
)}
</Formik>
</Card.Body>
</Card>
</Col>
</Row>
</Container>
)};//end;

export default Login;