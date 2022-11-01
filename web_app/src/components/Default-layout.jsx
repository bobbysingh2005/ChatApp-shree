import React, { createContext, useEffect, useReducer, useRef, useState } from 'react';
import MainHeader from './Main-header';
import MainSidebar from './Main-sidebar';
import MainFooter from './Main-footer';
import { Outlet } from 'react-router-dom';
import _ from 'lodash';

export const AppSetting = createContext();

export const settingInitialState = { userName: "", isLogin: false, isWsConnected: false, ws: false, pc: false, onOffer: false, onAnswer: false, iceCandidate: false };
export function settingReducer(state, { type, ...rest }) {
switch (type) {
case "set":
return Object.assign({}, state, rest);
break;
return state;
default:
break;
}
};//end;

export const usersInitialState = { selected: "", list: [] };
export function usersReducer(state, { type, ...rest }) {
switch (type) {
case "set":
return Object.assign({}, state, rest);
break;
default:
return state;
break;
}
};//end;

export const messageInitialState = { msg: [] };
export function messageReducer(state, { type, ...rest }) {
switch (type) {
case "add":
let msg = state.msg ? state.msg : [];
msg = [...msg, rest.msg];
return Object.assign({}, state, { msg: msg })
break;
case "clean":
return messageInitialState;
break;
default:
return state;
break;
}
};//end;

export default function DefaultLayout() {
const wso = useRef();
const [setting, setSetting] = useReducer(settingReducer, settingInitialState)
const [users, setUsers] = useReducer(usersReducer, usersInitialState)
const [message, setMessage] = useReducer(messageReducer, messageInitialState)

useEffect(() => {
if (!wso.current) {
wso.current = new WebSocket(`ws://192.168.1.2:3000/`);
wso.current.onopen = () => console.log(`websocket connection is open`);
wso.current.onclose = () => console.log(`websocket connection is close`);
};//endIf;

return () => {
}
}, []);

return (
<AppSetting.Provider value={{
ws: wso.current,
app: { ...setting, update: setSetting },
users: { ...users, update: setUsers },
message: { ...message, update: setMessage }
}} >
<MainHeader />
<MainSidebar />
<main>
<Outlet />
</main>
<MainFooter />
</AppSetting.Provider>
)
};//TheEnd;