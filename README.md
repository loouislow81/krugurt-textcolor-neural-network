# krugurt-textcolor-neural-network

<p align="left">
  <img src="https://badgen.net/github/release/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/releases/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/assets-dl/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/branches/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/forks/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/stars/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/watchers/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/tag/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/commits/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/last-commit/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/contributors/loouislow81/krugurt-textcolor-neural-network">
  <img src="https://badgen.net/github/license/loouislow81/krugurt-textcolor-neural-network">
</p>

<p align="left">
  <img src="assets/Screenshot_01.png" width="420">
  <img src="assets/Screenshot_02.png" width="420">
  <img src="assets/Screenshot_03.png" width="420">
  <img src="assets/Screenshot_04.png" width="420">
</p>

Change text color contrast against background image average color with machine learning on web browser with [krugurt.js](https://github.com/loouislow81/krugurt).



#### __network settings

- input layer ~ `3` (R,G,B).
- hidden layer ~ `3`
- output layer ~ `2` (isWhite, isBlack).
- activation function ~ `Sigmoid`.
- learning rate ~ `0.1`.
- iteration ~ `100`.

#### __samples

**(Note:)** `trainer` includes with nn settings and other DOM manipulations are located in `/src/assets/js/components/train.js`.

use the included sample image files for testing in `/src/views/index.html`,

```html
...

<!--samples-->

<!--pexels-photo-3597111.jpeg-->
<!--pexels-photo-3619784.jpeg-->
<!--pexels-photo-3631430.jpeg-->
<!--pexels-photo-3312671.jpeg-->
<!--pexels-photo-3473492.jpeg-->

...

  <img class="..."
       src="assets/image/low/dummy/pexels-photo-3597111.jpeg"
       data-src="assets/image/high/dummy/pexels-photo-3597111.jpeg"
       id="...">

...
```

#### __watch

to run the playground,

```bash
$ npm run watch
```

---

[MIT](https://github.com/loouislow81/krugurt-textcolor-neural-network/blob/master/LICENSE)
