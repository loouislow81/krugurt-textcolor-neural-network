// input image and extract average color
// see `extract-image-color.js` in `assets/js/components`
const image = document.getElementById("imageInput");
const rgb = extractColor(image);

// set rgb color in an array
const inputs = dataset();

// set neurons for each layers
const inputLayer = 3; // (R,G,B)
const hiddenLayer = 3; // value set in between inputLayer and outputLayer
const outputLayer = 2; // 2 results, either is black or white

// set network settings in an array
const layers = nnlayers();

const nn = new NeuralNetwork(inputLayer, hiddenLayer, outputLayer);

// set training
// learning_rate by default is 0.1
// activation function is sigmoid
const iteration = 100;
const threshold = 300;


function dataset() {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  return [r, g, b];
}


function nnlayers() {
  let inp_ = inputLayer;
  let hid_ = hiddenLayer;
  let out_ = outputLayer;
  return [inp_, hid_, out_];
}


function train() {
  for (let i = 0; i < iteration; i++) {
    const inputs = dataset();
    let supervised_target;
    // supervised_target is (r+g+b) = threshold(t),
    // for 2 outputs is [tA,tB],
    // if t value is bigger than either A or B,
    // then set [1,0] is a bigger-than is black,
    // meanwhile set [0,1] is a smaller-than is white.
    if (inputs[0] + inputs[1] + inputs[2] > threshold) {
      supervised_target = [1, 0];
    }
    else {
      supervised_target = [0, 1];
    }
    // normalized input values to look like this,
    // [ 0.8092408156056761, 0.1491446859764432 ]
    nn.train([
        inputs[0] / 255, // R
        inputs[1] / 255, // G
        inputs[2] / 255  // B
      ], supervised_target
    );
    log("(NN) training... iteration:", i);
  }
}


function predict() {
  // normalized output values to look like this,
  // [ 0.8092408156056761, 0.1491446859764432 ]
  const outputs = nn.predict([
    inputs[0] / 255, // R
    inputs[1] / 255, // G
    inputs[2] / 255  // B
  ]);
  const isWhite = "white";
  const isBlack = "black";
  const foregroundColor = document.getElementById("textColor");
  const backgroundColor = document.getElementById("bgColor");
  const foregroundResult = document.getElementById("textResult");
  const backgroundResult = document.getElementById("textRgb");
  const nnResult = document.getElementById("textNnResult");
  const rgbSum = inputs[0] + inputs[1] + inputs[2];
  if (rgbSum > threshold) {
    log("(NN) trained threshold value", rgbSum + " is bigger than " + threshold);
  } else {
    log("(NN) trained threshold value", rgbSum + " is smaller than " + threshold);
  }
  log("(NN) output result", outputs);
  if (outputs[0] > outputs[1]) {
    foregroundColor.style.color = isBlack;
    foregroundColor.style.textShadow = "0px 0px 5px #ffffff";
    backgroundColor.style.backgroundColor = "rgb(" + inputs + ")";
    foregroundResult.innerHTML = isBlack;
    backgroundResult.innerHTML = inputs;
    nnResult.innerHTML = "1>0 ~ [ " + outputs + " ]";
    log("(NN) predicted text color is", isBlack);
  }
  else {
    foregroundColor.style.color = isWhite;
    foregroundColor.style.textShadow = "0px 0px 5px #000000";
    backgroundColor.style.backgroundColor = "rgb(" + inputs + ")";
    foregroundResult.innerHTML = isWhite;
    backgroundResult.innerHTML = inputs;
    nnResult.innerHTML = "0<1 ~ [ " + outputs + " ]";
    log("(NN) predicted text color is", isWhite);
  }
}


log("(Image) average color RGB:", inputs);
log("(NN) input/hidden/output model:", layers);

train() // see `assets/js/components/train.js`
predict()
