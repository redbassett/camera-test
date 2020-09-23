var constraints = { video: { facingMode: "user" }, audio: false };


const  frame1 = document.querySelector("#frame1");


var imageCapture;

function startCamera() {
    navigator.mediaDevices.getUserMedia(
        {video: true, audio: false})
        .then(gotMedia)
        .catch(error => console.error(error));
}

function gotMedia(mediaStream) {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(mediaStreamTrack);
    console.log(imageCapture);

    setInterval(takeStill, 1000);
}

function takeStill() {
    imageCapture.takePhoto()
    .then(blob => {
        frame1.src = URL.createObjectURL(blob);
        frame1.onload = () => { URL.revokeObjectURL(this.src); }
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', startCamera, false);