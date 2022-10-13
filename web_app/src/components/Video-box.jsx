import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function VideoBox({ toggle }) {
const [isReady, setReady] = useState(false);
const videoRef = useRef();
const peerConnection = useRef();

const hasNavigator = () => {
return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
};//end;

const init = async () => {
try {
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
const config = {
    iceServers: [{ "url": "stun:stun.1.google.com:19302"}],
}
peerConnection.current = new RTCPeerConnection(config);
// const dataChannel = peerConnection.current.createDataChannel("my-channel", options)
peerConnection.current.onicecandidate = (event)=>{
console.log(event.icecandidate)
}
function streamResult (stream){
// videoRef.current.src = window.URL.createObjectURL(stream);
videoRef.current.srcObject = stream;
// console.log(stream.getTracks());
// console.log(stream.getTrackById(stream.getVideoTracks()[0].id));
// stream.removeTrack(stream.getVideoTracks()[0]);
// console.log(stream.getTracks());

};//end;
function streamError (err){ 
throw new Error(err) 
};
await navigator.getUserMedia({ video: true, audio: true }, streamResult, streamError);
} catch (error) {
alert(error)
}
};//end;

useEffect(() => {
if (isReady) {
init();
} else if (hasNavigator()) {
setReady(true)
};//end;

}, [isReady]);//end;

return (
<>
<video
ref={videoRef}
autoPlay={true}
></video>
<Button type="button" onClick={toggle} >Stop Video</Button>
</>
)
};//end;