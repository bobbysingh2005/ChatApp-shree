import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppSetting } from '../components/Default-layout';

export const VideoPlayer = ({ isVideo, cameraToggle, videoRef }) => {
if (isVideo) return (
<>
<video autoPlay ref={videoRef} />
<button type="button" onClick={cameraToggle} >Stop Video Chat</button>
</>);
return <button type="button" onClick={cameraToggle} >Start Video Chat</button>;
};//endPlayer

export default function VideoChat(sendTo = false) {
const { app, users, ws } = useContext(AppSetting);
const peerConnection = useRef();
const videoRef = useRef();

const [isVideo, setCamera] = useState(false);

//toggle function for video on/off
const cameraToggle = () => setCamera(!isVideo);

const onOffer = async (offer) => {
peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
peerConnection.createAnswer((answer) => {
peerConnection.setLocalDescription(answer);
ws.send(JSON.stringify({ type: "pc_answer", id: users.selected.id, answer: answer }))
})
};//end;
const onAnswer = async (answer) => {
peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
};//end;

useEffect(() => {
if (isVideo) {
if (!peerConnection.current) {
RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection;
const config = { iceServers: [{ "url": "stun:stun.1.google.com:19302" }], }
peerConnection.current = new RTCPeerConnection(config, { optional: [{ RtpDataChannel: true }] });
console.log('initial Peer connection');
alert(JSON.stringify(app))
};//endIf;
};//endIf;
app.update({ type: "set", onOffer: onOffer, onAnswer: onAnswer, pc: peerConnection.current })
}, [isVideo])
return (
<>
<p>
{isVideo ? "Video is ON" : "Video is OFF"}
</p>
<VideoPlayer isVideo={isVideo} cameraToggle={cameraToggle} videoRef={videoRef} />
</>

)
};//end;