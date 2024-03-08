import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgo';
import {stacksvg} from 'gulp-stacksvg';
import {deleteAsync} from 'del';
import rename from 'gulp-rename';


//html compress
const htmlMin = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
}

// Styles compress
const styles = () => {
  return gulp.src('source/less/style.less', {sourcemaps: true})
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(), csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', {sourcemaps: '.'}))
    .pipe(browser.stream());
}

//Scripts compress
const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

// Copy origin images
const copyImages = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(gulp.dest('build/img'));
}

// Copy manifest, fonts, icon
const copyFilesToBuild = (done) => {
  gulp.src([
      'source/fonts/*.{woff2,woff}',
      'source/*.ico',
      'source/manifest.webmanifest'],
    {base: 'source'})
    .pipe(gulp.dest('build'))
  done();
}

// Svg compress
const compressSvg = () => {
  return gulp.src('source/img/divider.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

//Images compress
const compressImages = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

//WebP compress
const compressImagesToWebp = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'));
}

// Create Stack
const createStack = () => {
  return gulp.src(['source/img/*.svg', '!source/img/divider.svg'])
    .pipe(svgo())
    .pipe(stacksvg({output: `sprite`}))
    .pipe(gulp.dest('build/img'))
}

//Clean
export const clean = () => {
  return deleteAsync('build');
}

// Server
export const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(htmlMin, reload));
}

//Build
export const build = gulp.series(
  clean,
  compressImages,
  copyFilesToBuild,

  gulp.parallel(
    styles,
    htmlMin,
    scripts,
    compressSvg,
    createStack,
    compressImagesToWebp
  ),
);

//Default
export default gulp.series(
  clean,
  copyImages,
  copyFilesToBuild,

  gulp.parallel(
    styles,
    htmlMin,
    scripts,
    compressSvg,
    createStack,
    compressImagesToWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
