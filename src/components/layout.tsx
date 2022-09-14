import * as React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import '../images/satwik.jpg';

function Layout () {
return (
<Container>
<Row>
<Col>
<h1>
Welcome to Shree Chat App
</h1>
{/* <img src={`./images/satwik.jpg`} title={`satwik photo`} alt={`satwik`} width={`100px`} height={`150px`} /> */}
</Col>
</Row>
<Row>
<Col>
<main>
<Outlet />
</main>
</Col>
</Row>
</Container>
)};//end;

export default Layout;