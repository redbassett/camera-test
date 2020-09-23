var constraints = { video: { facingMode: "user" }, audio: false };


const  cameraOutput = document.querySelector("#camera--output"),
    cameraShutter = document.querySelector("#camera--shutter");


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
        cameraOutput.src = URL.createObjectURL(blob);
        cameraOutput.onload = () => { URL.revokeObjectURL(this.src); }
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', startCamera, false);