import React, { useContext, useEffect } from 'react';
import { AppSetting } from './Default-layout';
import _ from 'lodash';
import Moment from 'react-moment';

export default function Messages() {
const { message } = useContext(AppSetting);
useEffect(() => {

}, [message])
return (
<>
<section>
<h1>Messages</h1>
{message.msg ?
_.map(message.msg, (msg, i) => {
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

