// input image and extract average color
// see `extract-image-color.js` in `assets/js/components`
const image = document.getElementById("imageInput");
const rgb = extractColor(image);

let r, g, b;

// set rgb color in an array
const inputs = dataset();

const nn = {
  // set neurons for each layers
  inputLayer: 3,  // (R,G,B)
  hiddenLayer: 3, // value set in between inputLayer and outputLayer
  outputLayer: 2,  // 2 results, either is black or white

  // set training
  // learning_rate by default is 0.1
  // activation function is sigmoid
  calibrate: {
    iteration: 100,
    threshold: 300
  }
};

const ml = new NeuralNetwork(nn.inputLayer, nn.hiddenLayer, nn.outputLayer);


function dataset() {
  r = rgb.r;
  g = rgb.g;
  b = rgb.b;
  return [r, g, b];
}


function train() {
  for (let i = 0; i < nn.calibrate.iteration; i++) {

    const inputs = dataset();
    let supervised_target;

    // supervised_target is (r+g+b) = threshold(t),
    // for 2 outputs is [tA,tB],
    // if t value is bigger than either A or B,
    // label [1,0] is a bigger-than is black,
    // label [0,1] is a smaller-than is white.
    if (inputs[0] + inputs[1] + inputs[2] > nn.calibrate.threshold) {
      supervised_target = [1, 0];
    }
    else {
      supervised_target = [0, 1];
    }

    // normalized input values to look like this,
    // [ 0.8092408156056761, 0.1491446859764432 ]
    ml.train([
        inputs[0] / 255, // R
        inputs[1] / 255, // G
        inputs[2] / 255  // B
      ], supervised_target
    );
    log("(nn) training... [iteration]", "");
  }
}


function predict() {

  const options = {
    dom: {
      foregroundColor: document.getElementById("textColor"),
      backgroundColor: document.getElementById("bgColor"),
      foregroundResult: document.getElementById("textResult"),
      backgroundResult: document.getElementById("textRgb"),
      nnResult: document.getElementById("textScore"),
    },
    rgbSum: inputs[0] + inputs[1] + inputs[2],
    isWhite: "white",
    isBlack: "black"
  };

  // normalized output values to look like this,
  // [ 0.8092408156056761, 0.1491446859764432 ]
  const outputs = ml.predict([
    inputs[0] / 255, // R
    inputs[1] / 255, // G
    inputs[2] / 255  // B
  ]);

  if (options.rgbSum > nn.calibrate.threshold) {
    log("(nn) (threshold)", options.rgbSum + "/" + nn.calibrate.threshold);
  } else {
    log("(nn) (threshold)", options.rgbSum + "/" + nn.calibrate.threshold);
  }
  log("(nn) (output) score", outputs);

  if (outputs[0] > outputs[1]) {
    options.dom.foregroundColor.style.color = options.isBlack;
    options.dom.foregroundColor.style.textShadow = "0 0 5px #ffffff";
    options.dom.backgroundColor.style.backgroundColor = "rgb(" + inputs + ")";
    options.dom.foregroundResult.innerHTML = options.isBlack;
    options.dom.backgroundResult.innerHTML = inputs;
    options.dom.nnResult.innerHTML = "[" + outputs + "]";
    log("(nn) (output) predicted color is", options.isBlack);
  }
  else {
    options.dom.foregroundColor.style.color = options.isWhite;
    options.dom.foregroundColor.style.textShadow = "0 0 5px #000000";
    options.dom.backgroundColor.style.backgroundColor = "rgb(" + inputs + ")";
    options.dom.foregroundResult.innerHTML = options.isWhite;
    options.dom.backgroundResult.innerHTML = inputs;
    options.dom.nnResult.innerHTML = "[" + outputs + "]";
    log("(nn) (output) predicted color ~", options.isWhite);
  }
}


log("(image) (input) average color RGB:", inputs);
log("(nn) properties:", ml);


