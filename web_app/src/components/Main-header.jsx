import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AppSetting } from './Default-layout';

export default function MainHeader() {
const {app} = useContext(AppSetting);
const location = useLocation();

useEffect(()=>{
    let title = `Welcome to ShreeChatApp`;
    if(app && app.isLogin && app.userName) {
document.title = `${app.userName} ${title} - online  `;
}else{
document.title = `${title} - Wait for Join`;
};//endIf;
},[location.pathname, app.setting])

return (
<header>
Welcome { app && app.userName}
</header>
)
}
