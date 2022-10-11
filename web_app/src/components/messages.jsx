import React, { useContext, useEffect } from 'react';
import { AppSetting } from './Default-layout';
import _ from 'lodash';
import Moment from 'react-moment';

function Messages() {
const { message } = useContext(AppSetting);
useEffect(() => {

}, [message])
return (
<>
<section>
<h1>Messages</h1>
{message.message ?
_.map(message.message.msg, (msg, i) => {
return (
<article key={i}>
<section>
<header><Moment date={msg.date} format="DD/MM/YYYY" /></header>
{msg.text}
<footer>{msg.user.name}</footer>
</section>
</article>)
})
: ""}
</section>
</>
)
};//end

export default Messages;
