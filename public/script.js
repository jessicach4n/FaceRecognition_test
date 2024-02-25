// import * as tf from '/scripts/@tensorflow/tfjs/dist/tf.js';
import * as faceapi from '/scripts/@vladmandic/face-api/dist/face-api.esm.js'; // use when in dev mode
// import * as faceapi from '@vladmandic/face-api'; // use when downloading face-api as npm

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
]).then(startWebcam).then(detectFaces);

const video = document.getElementById('video');

function startWebcam() {
    navigator.mediaDevices.getUserMedia(
        { 
            video: true,
            audio: false
        }).then((stream) => {
            video.srcObject = stream;
        }
    )
}

async function detectFaces() {
    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi
                .detectAllFaces(video)
                .withFaceLandmarks();

                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                const results = resizedDetections.map(detection => {
                    return faceapi.draw.drawDetections(canvas, detection);
                });

        }, 100);
    });
}