import React, { useContext, useEffect } from 'react'
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { AppSetting } from './Default-layout';

export default function MainSidebar() {
const { app, ws, sendTo, users} = useContext(AppSetting);

useEffect(()=>{
// alert(JSON.stringify(users.users))
},[users])

return (
<div>
<h1>Side bar</h1>
<ul>
{users.users && users.users.list ? _.map(users.users.list, (val, i)=>{
if(!val) return null;
// if(users.users && users.users.selected===val.name) alert(`selected user: ${val.name}`);
if(users.users && users.users.selected.id===val.id) return (<li key={i} aria-label={`selected ${val.name}`} >{val.name}</li>);

return (
<li key={i}
role="button"
aria-label={val.name}
onClick={(ev)=>{
ev.preventDefault();
let data = {
  type: "join_request",
  user: val
};//end;
ws.send(JSON.stringify(data));
}}
>
{val.name}
</li>)
})
: (<li>No user active</li>) }
</ul>
</div>
)
}
