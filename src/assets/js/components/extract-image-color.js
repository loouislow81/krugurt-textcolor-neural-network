/*
  Extract Image Average Color in RGB
  @param {image_id} as in html element id
*/
function extractColor(image) {
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    length,
    i = -4,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;
  if (!context) {
    return defaultRGB;
  }
  height = canvas.height = image.naturalHeight || image.offsetHeight || image.height;
  width = canvas.width = image.naturalWidth || image.offsetWidth || image.width;
  context.drawImage(image, 0, 0);
  try {
    data = context.getImageData(0, 0, width, height);
  }
  catch (error) {
    return defaultRGB;
  }
  length = data.data.length;
  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);
  return rgb;
}
