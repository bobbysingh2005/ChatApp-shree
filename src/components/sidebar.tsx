import * as React from 'react';
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link} from "react-router-dom";
import Author from "../utils/author";

const SideBar = (props: any) => {

useEffect(()=>{
// eslint-disable-next-line
},[props.users]);

return (
<div aria-label="side bar" role="navigation">
<h6>Welcome {Author.get()}</h6>
<Nav
activeKey={props.to?props.to:""}
onSelect={(usr: any) => {
let to = usr.split('#')[1];
props.change(to)
}}
>
{props.users && props.users.map((val: any, i: number)=>{
if(Author.get()===val) return null;
return (
<Nav.Item key={'x'+i}>
<Nav.Link 
href={`#${val}`}
>{val}</Nav.Link>
</Nav.Item>
)})}
</Nav>
</div>
)};//end;

export default SideBar;