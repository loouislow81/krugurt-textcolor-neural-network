// input image and extract average color
// see `extract-image-color.js` in `assets/js/components`
const image = document.getElementById("imageInput");
const rgb = extractColor(image);

// set rgb color in an array
const inputs = inputColor();

// set neurons
const inputLayer = 3; // (RRR, GGG, BBB)
const hiddenLayer = 3; // value set in between inputLayer and outputLayer
const outputLayer = 2; // 2 results, either is black or white

// set network settings in an array
const layers = nnlayers();

const nn = new NeuralNetwork(inputLayer, hiddenLayer, outputLayer);

// set training
// learning_rate by default is 0.1
// activation function is sigmoid
const iteration = 100;
const pixelSize = 300;


function inputColor() {
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
  inputColor();
  for (let i = 1; i < iteration; i++) {
    const inputs = inputColor();
    let supervised_target;
    if (inputs[0] + inputs[1] + inputs[2] > pixelSize) {
      supervised_target = [1, 0]; // iswhite
    }
    else {
      supervised_target = [0, 1]; // isBlack
    }
    nn.train( // input_array, target_array
      [
        inputs[0] / 255, // R
        inputs[1] / 255, // G
        inputs[2] / 255  // B
      ], supervised_target
    );
    log("(Neural Network) training... iteration:", i);
  }
  log("(Neural Network) end training!", "");
}


function predict() {
  const predict = nn.predict([ // input_array
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
  if (predict[0] > predict[1]) {
    foregroundColor.style.color = isBlack;
    foregroundColor.style.textShadow = "0px 0px 5px #ffffff";
    backgroundColor.style.backgroundColor = "rgb(" + inputs + ")";
    foregroundResult.innerHTML = isBlack;
    backgroundResult.innerHTML = inputs;
    log("(Neural Network) predicted text color is", isBlack);
  }
  else {
    foregroundColor.style.color = isWhite;
    foregroundColor.style.textShadow = "0px 0px 5px #000000";
    backgroundColor.style.backgroundColor = "rgb(" + inputs + ")";
    foregroundResult.innerHTML = isWhite;
    backgroundResult.innerHTML = inputs;
    log("(Neural Network) predicted text color is", isWhite);
  }
}


log("(Image) average color RGB:", inputs);
log("(Neural Network) input/hidden/output layers:", layers);

train() // see `assets/js/components/train.js`
predict()
