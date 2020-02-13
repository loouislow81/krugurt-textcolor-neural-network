# krugurt-textcolor-neural-network

<p align="left">
  <img src="Screenshot_01.png" width="420">
  <img src="Screenshot_02.png" width="420">
  <img src="Screenshot_03.png" width="420">
  <img src="Screenshot_04.png" width="420">
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

MIT License

Copyright (c) 2020 Loouis Low

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

