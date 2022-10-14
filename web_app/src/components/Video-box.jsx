import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AppSetting } from './Default-layout';

export default function VideoBox({ toggle, sendTo }) {
const { app, ws, users, pc } = useContext(AppSetting);
const [isReady, setReady] = useState(false);
const videoRef = useRef();

const hasNavigator = () => {
return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
};//end;

const pcInit = async (stream) => {
try {
    
// Setup stream listening
pc.addStream(stream)

pc.onicecandidate = (event) => {
if (event.candidate) {
alert(event.icecandidate)
};//endIf;
};//end;

// Begin the offer
pc.createOffer(function (offer) {
pc.setLocalDescription(offer);
pc.setRemoteDescription(offer);
alert("offer: "+JSON.stringify(offer, null, 2))
sendTo(ws, { type: "pc_offer", id: users.selected.id, offer: offer })
});//end;

console.log(`ready pc`)

} catch (err) {
alert(err)
}
};//end;

const init = async () => {
try {
navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia;

function streamResult(stream) {
// videoRef.current.src = window.URL.createObjectURL(stream);
videoRef.current.srcObject = stream;
pcInit(stream)
// console.log(stream.getTracks());
// console.log(stream.getTrackById(stream.getVideoTracks()[0].id));
// stream.removeTrack(stream.getVideoTracks()[0]);
// console.log(stream.getTracks());

};//end;
function streamError(err) {
throw new Error(err)
};
await navigator.getUserMedia({ video: true, audio: false }, streamResult, streamError);
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
}, [isReady, pc]);//end;

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