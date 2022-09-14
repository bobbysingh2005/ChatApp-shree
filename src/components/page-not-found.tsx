import * as React from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function PageNotFound () {
let navigate = useNavigate();
return (
    <>
<h1>Page not found</h1>
<Button type="button" onClick={(e)=>{
e.preventDefault();
navigate('/');
}}>Back to Home</Button>
    </>
)};//end;

export default PageNotFound;