var ws = false;
var isAuthor = () => window.sessionStorage.getItem('author') ? true : false;
var getAuthor = () => window.sessionStorage.getItem('author');
var setAuthor = (arg) => window.sessionStorage.setItem('author', arg);
var ready = false;
let to = "";



(function (window, document, $){

if(!isAuthor()) window.location = '/login';
const form = document.getElementById('msg');

document.getElementById('author').innerHTML = getAuthor();

$('#refresh').click(function Refresh (){
ws.send(JSON.stringify({ type: 'initial', name: getAuthor()}));
});//endRefresh;

form.onsubmit = (ev)=>{
ev.preventDefault();
let {name, value} = ev.target.msgText;
sendTo(ws, { type: 'answer', name: to, msg: value})
// ws.send('ping')
};//end;

if(WebSocket){
ws = new WebSocket('wss://localhost:8080/chat');

ws.onopen = () => console.log('WebSocket connection is Open');
ws.onclose = () => console.log('WebSocket connection is Close');
ws.onmessage = function (message){
if(isJson(message.data)){
const data = JSON.parse(message.data)
switch (data.type) {

case 'server_initial':
if(data.success) {
console.log('initial done');
setTimeout(()=>{
ws.send(JSON.stringify({ type: 'client_userlist', name: getAuthor()}));
}, 2000);
}else{
window.sessionStorage.clear();
window.location = '/login'
}
break;

case 'update_userlist':
console.log('user update list')
userList(data.name);
break;

default:
break;
};//endSwitch;

}else{
console.log('response message not json')
};//endIf;
};//endOnMessage;
setTimeout(()=>{
ws.send(JSON.stringify({ type: 'initial', name: getAuthor()}));
}, 500);
};//endIf;

function isJson (arg) {
try {
JSON.parse(arg);
}catch(err){
return false;
};//endTry;
return true;
};//endIsJson;

function userList (users){
let ul = $('#userList');
ul.innerHTML = "";
for(let x in users){
let li = document.createElement('li');
li.innerHTML = users[x];
li.onclick = ()=>alert('click kiya');
ul.append(li)
console.log(x)
};//endFor;
};//end;

})(window, document, jQuery);