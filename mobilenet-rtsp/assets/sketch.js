// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trianed customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

let classifier;

const loadHls = () => {
  var video = document.getElementById("video");
  var videoSrc = "http://localhost:8000/master.m3u8";
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // video.play();
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  }
};

loadHls();
// Grab elements, create settings, etc.
const video = document.getElementById("video");
const resultsP = document.getElementById("resultP");
// Create a webcam capture
// navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//   video.srcObject = stream;
//   video.play();
// });

const loop = (classifier) => {
  classifier.classify(video).then((results) => {
    if (results.length > 0) {
      resultsP.innerHTML = `Label: ${
        results[0].label
      } ${results[0].confidence.toFixed(4)}`;
      loop(classifier); // Call again to create a loop
    }
  });
};

// Initialize the Image Classifier method with MobileNet passing the video as the
// second argument and the getClassification function as the third
ml5.imageClassifier("MobileNet").then((classifier) => loop(classifier));
