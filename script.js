const canvas = document.querySelector("#output");
var imageCapture;
const totalFrames = 10;
const frames = new Array();

function init() {
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
    .then(blob => createImageBitmap(blob))
    .then(imageBitmap => {
        frames.push(imageBitmap)
        if (frames.length == totalFrames + 1) frames.shift();
        drawCanvas();
    })
    .catch(error => console.error(error));
}

function drawCanvas() {
    canvas.width = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio  = Math.min(canvas.width / frames[0].width, canvas.height / frames[0].height);
    let x = (canvas.width - frames[0].width * ratio) / 2;
    let y = (canvas.height - frames[0].height * ratio) / 2;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames.forEach(frame => {
        ctx.globalCompositeOperation = "screen"
        ctx.drawImage(frame, 0, 0, frame.width, frame.height,
            x, y, frame.width * ratio, frame.height * ratio);
    });
}

function getFrame(index) {
    return document.querySelector("#frame" + index);
}

window.addEventListener('load', init, false);