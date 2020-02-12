const gulp = require('gulp')
const sass = require('gulp-sass')
const concatCss = require('gulp-concat-css')
const uglifyCss = require('gulp-uglifycss')
const sassGlob = require('gulp-sass-glob')
const jsonmin = require('gulp-jsonmin')
const serve = require('browser-sync').create()
const postCss = require('gulp-postcss')
const autoPrefixer = require('autoprefixer')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const mozjpeg = require('imagemin-mozjpeg')
const gutil = require('gulp-util')


// html
const srcHtmlPath = 'src/views/**/*.html'

// js
const srcUtilJsPath = 'src/assets/js'
const srcComponentsJsPath = 'src/assets/js/components/*.js'
const distJsPath = 'dist/assets/js'

// scss/css
const srcScssPath = 'src/assets/scss/style.scss'
const distCssPath = 'dist/assets/css'

// image
const srcImageRecursivePath = 'src/assets/image/**/*'
const distHqImagePath = 'dist/assets/image/high'
const distLqImagePath = 'dist/assets/image/low'

// production
const distProdPath = 'dist'
const distProdRecursivePath = 'dist/**/*'

// data
const srcJsonDataPath = 'src/assets/data/**/*.json'
const distJsonDataPath = 'dist/assets/data/'

// service worker
const srcServiceWorkerPath = 'src/assets/js/service_worker'

// locale
const srcLocalePath = 'src/assets/locale/**/*'
const distLocalePath = 'dist/assets/locale/'

// PWA app manifest
const srcAppManifestPath = 'src/assets/pwa'

// watch
const watchSrcHtmlPath = 'src/views/**/*.html'
const watchSrcScssPath = 'src/assets/scss/**/*.scss'
const watchSrcScriptsPath = 'src/assets/js/**/*.js'
const watchSrcImagePath = 'src/assets/image/**/*'
const watchSrcJsonDataPath = 'src/assets/data/**/*.json'
const watchSrcJsonLocalePath = 'src/assets/locale/**/*.json'
const watchSrcPwaPath = 'src/manifest.json'


// reload web browser
reload = (done) => {
  serve.reload()
  done()
}


// ...serve http
gulp.task('serve',
  gulp.series(function(done) {
    serve.init({
      server: {
        baseDir: distProdPath
      },
      notify: false
    })
    done()
  })
)


// ...minify html
gulp.task('html', () => {
  return gulp.src(srcHtmlPath)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      jsmin: true, // inline js
      cssmin: true // inline css
    }))
    .pipe(gulp.dest(distProdPath))
})


// ...minify/preprocess scss
gulp.task('sass', () => {
  return gulp.src(srcScssPath)
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError))
    .pipe(postCss([autoPrefixer()]))
    .pipe(gulp.dest(distCssPath))
    .pipe(serve.reload({
      stream: true
    }))
    .pipe(gulp.dest(distCssPath))
})


// ...minify js (your custom scripts management)
gulp.task('pre-scripts', () => {
  return gulp.src([
      srcUtilJsPath + '/krunch+utility.js',
      srcComponentsJsPath
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(distJsPath))
    .pipe(serve.reload({
      stream: true
    }))
    .pipe(rename('scripts.pre.js'))
    .pipe(uglify())
    .pipe(gulp.dest(distJsPath))
    .pipe(serve.reload({
      stream: true
    }))
})


// ...merge js (merge with compiler)
gulp.task('scripts', () => {
  return gulp.src([
      srcUtilJsPath + '/service_worker/krugurt+core.min.js', // mandatory
      srcUtilJsPath + '/krunch+compiler.min.js', // mandatory
      srcUtilJsPath + '/krunch+locale.min.js', // optional
      srcUtilJsPath + '/krunch+torrent.min.js', // optional
      srcUtilJsPath + '/krunch+neuralnetwork.min.js', // optional
      distJsPath + '/scripts.pre.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(distJsPath))
    .pipe(serve.reload({
      stream: true
    }))
})


// ...minify image (high quality)
gulp.task('image-high-quality', () => {
  return gulp.src(srcImageRecursivePath)
    .pipe(imagemin([
      pngquant({ quality: [1, 1] }), // set png quality
      mozjpeg({ quality: 100 }), // set jpg quality
    ]))
    .pipe(gulp.dest(distHqImagePath))
})


// ...minify image (low quality)
gulp.task('image-low-quality', () => {
  return gulp.src(srcImageRecursivePath)
    .pipe(imagemin([
      pngquant({ quality: [0.5, 0.5] }), // set png quality
      mozjpeg({ quality: 50 }), // set jpg quality
    ]))
    .pipe(gulp.dest(distLqImagePath))
})


// ...minify data
gulp.task('data', () => {
  return gulp.src(srcJsonDataPath)
    .pipe(jsonmin())
    .pipe(gulp.dest(distJsonDataPath))
})


// ...minify locale
gulp.task('locale', () => {
  return gulp.src(srcLocalePath)
    .pipe(jsonmin())
    .pipe(gulp.dest(distLocalePath))
})


// ...move service worker
gulp.task('service-worker', () => {
  return gulp.src([
      srcServiceWorkerPath + '/krugurt+init.min.js',
      srcServiceWorkerPath + '/krugurt+sw.min.js'
    ])
    .pipe(gulp.dest(distProdPath))
})


// ...move app manifest
gulp.task('app-manifest', () => {
  return gulp.src([
      srcAppManifestPath + '/manifest.json'
    ])
    .pipe(gulp.dest(distProdPath))
})


// ...watch changes
gulp.task('watch',
  gulp.series([

    // minify files
    //'image-high-quality',
    //'image-low-quality',
    'pre-scripts',
    'scripts',
    'sass',
    'html',
    'data',
    // move files
    'service-worker',
    'locale',
    'app-manifest',
    // host http
    'serve'

  ], () => {

    gulp.watch(watchSrcImagePath,
      gulp.series('image-high-quality', reload))

    gulp.watch(watchSrcImagePath,
      gulp.series('image-low-quality', reload))

    gulp.watch(watchSrcScriptsPath,
      gulp.series(['pre-scripts', 'scripts', reload]))

    gulp.watch(watchSrcScssPath,
      gulp.series(['sass', reload]))

    gulp.watch(watchSrcHtmlPath,
      gulp.series(['html', reload]))

    gulp.watch(watchSrcJsonDataPath,
      gulp.series('data', reload))

    gulp.watch(watchSrcJsonLocalePath,
      gulp.series('locale', reload))

    gulp.watch(watchSrcPwaPath,
      gulp.series('app-manifest', reload))

  })

)
