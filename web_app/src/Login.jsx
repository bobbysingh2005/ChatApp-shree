import React, { useCallback, useContext, useEffect } from 'react'
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AppSetting } from './components/Default-layout';

const Login = () => {
const navigate = useNavigate();
const { app } = useContext(AppSetting);

const reLogin = useCallback(async () => {
let author = JSON.parse(sessionStorage.getItem('author'));
await app.update({ type: "set", id: author.id, userName: author.userName, isLogin: true });
navigate('/home')
}, [])
useEffect(() => {
let author = window.sessionStorage.getItem('author');
if (author) {
reLogin()
}
}, []);

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
validationSchema={(value)=>Yup.object().shape({
userName: Yup.string().required('User name is required')
.test('userName', "user or email id not valid", (value) => {
return Yup.string().max(50).isValidSync(value) || Yup.string().email().isValidSync(value)
})
})}
onSubmit={async (values, { setSubmitting }) => {
try {
// alert(JSON.stringify(values));
setSubmitting(false)
await app.update({ type: "set", userName: values.userName, isLogin: true });
navigate('/home')
} catch (error) {
alert(error)
}
}}
>
{({ errors, values, handleChange, handleBlur, handleSubmit, isValidating, isValid, isSubmitting }) => (
<Form onSubmit={handleSubmit} noValidate>
<Form.Group controlId='userName'>
<Form.Label id="userName" >User and email</Form.Label>
<Form.Control
type="text"
name="userName"
placeholder="enter user name or email id"
onChange={handleChange}
onBlur={handleBlur}
value={values.userName}
autoFocus
isInvalid={errors.userName}
isValid={isValid.userName || !!errors.userName}
/>
{errors.userName ? <Form.Control.Feedback type='inValid' role="alert" >{errors.userName}D</Form.Control.Feedback> : ""}
</Form.Group>
<Button type="submit" >Login {isSubmitting ? (<Spinner animation="border" role="alert"><span className="visually-hidden">Loading...</span></Spinner>) : ""}</Button>
<pre>{JSON.stringify(errors, null, 2)}</pre>
<pre>valid: {JSON.stringify(isValid, null, 2)}</pre>
</Form>
)}
</Formik>
</Card.Body>
</Card>
</Col>
</Row>
</Container>
)
};//end;

export default Login;