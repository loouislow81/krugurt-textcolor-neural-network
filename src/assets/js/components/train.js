// input image and extract average color
// see `extract-image-color.js` in `assets/js/components`
const image = document.getElementById("imageInput");
const rgb = extractColor(image);

// set neurons
const inputLayer = 3; // (RRR, GGG, BBB)
const hiddenLayer = 3; // value set in between inputLayer and outputLayer
const outputLayer = 2; // 2 results, either is black or white

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
      supervised_target = [1, 0];
    }
    else {
      supervised_target = [0, 1];
    }
    nn.train(
      [inputs[0] / 255, inputs[1] / 255, inputs[2] / 255],
      supervised_target
    );
    log("(Neural Network) training... iteration:", (i));
  }
  log("(Neural Network) end training!", "");
}


function predict() {
  const inputs = inputColor();
  const predict = nn.predict([
    inputs[0] / 255,
    inputs[1] / 255,
    inputs[2] / 255
  ]);
  const textId = document.getElementById("textColor");
  const resultId = document.getElementById("textResult");
  const resultRgbId = document.getElementById("textRgb");
  const bgId = document.getElementById("bgColor");
  if (predict[0] > predict[1]) {
    const isBlack = "black";
    bgId.style.backgroundColor = "rgb(" + inputs + ")";
    textId.style.color = isBlack;
    textId.style.textShadow = "0px 0px 5px #ffffff";
    resultId.innerHTML = isBlack;
    resultRgbId.innerHTML = inputs;
    log("(Neural Network) predicted color is", isBlack);
  }
  else {
    const isWhite = "white";
    bgId.style.backgroundColor = "rgb(" + inputs + ")";
    textId.style.color = isWhite;
    textId.style.textShadow = "0px 0px 5px #000000";
    resultId.innerHTML = isWhite;
    resultRgbId.innerHTML = inputs;
    log("(Neural Network) predicted color is", isWhite);
  }
}


const inputs = inputColor();
log("(Image) average color RGB:", inputs);

const layers = nnlayers();
log("(Neural Network) input/hidden/output layers:", layers);

train() // see `assets/js/components/train.js`
predict()