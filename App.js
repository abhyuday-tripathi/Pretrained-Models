Webcam.set({
  width: 300,
  height: 300,
  image_format: 'png',
  png_quality: 90,
  constraints: {
    facingMode: 'environment',
  },
});

Webcam.attach('#webcamContainer');

const takeSnapshot = () => {
  Webcam.snap(dataUri => {
    document.querySelector(
      '#outputImage'
    ).innerHTML = `<img src=${dataUri} id="capturedImage"/>`;
  });
};

const modelLoaded = () => console.log('Model Loaded!');

const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

const gotResult = (err, result) => {
  if (err) {
    console.error(err);
  } else {
    document.querySelector('#object').innerText = result[0].label;
  }
};

const check = () => {
  classifier.classify(document.querySelector('#capturedImage'), gotResult);
};
