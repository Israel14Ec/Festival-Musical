//Extrae archivos, importar archivos
//funcion src, dest
const {src, dest, watch, parallel} = require("gulp");

//importar dependencia de scss
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//mejora el código de css
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//importar dependencias de img
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");


//Para comprimir js
const terser = require('gulp-terser-js');

//Funciones----------------------------------

//transforma de archivos .scss a css
function css (done) {
    src('src/scss/**/*.scss')//Identificar el archivo de sass
    .pipe(sourcemaps.init())    //Inicializa el sourcemaps
    .pipe(plumber())
    .pipe(sass()) //compilarlo
    .pipe( postcss([ autoprefixer(), cssnano() ]) )
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));//almacenarlo

    //pipe: accion que se usa despues de otra
    //callback
    done();
}

//transforma a webp
function versionWebp (done){

    const opciones = {
        quality : 50
    };

    src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones) )
        .pipe(dest('build/img'))
    done();
}

//aligerar imagen
function imagenes (done){

    const opciones = {
        optimizationLevel: 3
    }

    src("src/img/**/*.{png,jpg}")
        .pipe( cache ( imagemin(opciones) ) )
        .pipe(  dest('build/img'))
    done();
}

//transforma a AVIF
function versionAvif (done){

    const opciones = {
        quality : 50
    };

    src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones) )
        .pipe(dest('build/img'))
    done();
}

//Compilar js
function js( done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe( terser()) //Comprime el js
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

    done();
}

function dev (done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    done();
}

//deployment del proyecto:

function prod(done){
    src("build/**/*.*")
        .pipe(dest("prod/build"));
    src("video/**/*.*")
        .pipe(dest("prod/video"));
    src("index.html")
        .pipe(dest("prod"));
    done();
}


//llamamos a las funciones
exports.css = css;
exports.js = js;
exports.versionWebp = versionWebp
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(dev, js) ; //ejecuta dos tareas
exports.prod = prod;