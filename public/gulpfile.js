var autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    express = require('express'),
    gulp = require('gulp'),
    karma = require('karma'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    typescript = require('gulp-tsc'),
    uglify = require('gulp-uglify');

gulp.task('default', function () {
    gulp.start('watch');
    gulp.start('static-server');
});

gulp.task('watch', function () {
    gulp.watch('js/**/*.ts', ['compile-tsc', 'compile-tsc-tests']);
    gulp.watch('js/test/*.js', ['test']);
});

gulp.task('static-server', function () {
    var server = express(),
        port = 6060;

    server.use(express.static('./'));
    server.all('/*', function (req, res) {
        res.sendFile('index.html', {root: './'});
    });

    server.listen(port);
    console.log('Express static server running for litchi-sass on port ' + port);
});

gulp.task('compile-tsc', function () {
    tsc('js', 'app');
});

gulp.task('compile-tsc-tests', function () {
    tsc('js', 'tests');
});

gulp.task('sass', function () {
    compileSass('litchi', 'css/source')
});

gulp.task('test', function (done) {
    var server = new karma.Server({
        configFile: process.cwd() + '/js/test/karma.conf.js'
    }, done);

    server.start();
});

gulp.task('concat-vendor', function () {
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/lodash/lodash.min.js',
        'bower_components/rxjs/dist/rx.all.min.js'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('js/dist'))
        .pipe(notify('Vendor compiled'));
});

gulp.task('concat-dist', function () {
    gulp.src([
        'js/dist/vendor.js',
        'js/dist/app.js'
    ])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('litchi.js'))
        .pipe(gulp.dest('js/dist'))
        .pipe(notify('litchi.js compiled'));
});

function tsc(path, type) {
    if (type == 'tests' || type == 'app') {
        var tscSrc = {
            app: [
                path + '/**/*.ts',

                // Ignore specs, dist, and typings
                '!' + path + '/**/*.specs.ts',
                '!' + path + '/dist/**/*',
                '!' + path + '/typings/**/*'
            ],
            tests: [
                path + '/**/*.ts',

                // Ignore dist and typings
                '!' + path + '/dist/**/*',
                '!' + path + '/typings/**/*'
            ]
        };

        gulp.src(tscSrc[type], {base: path})
            .pipe(plumber({errorHandler: onError}))
            .pipe(typescript({
                target: 'ES5',
                sortOutput: true,
                sourceMap: false,
                removeComments: true
            }))
            .pipe(concat((type == 'tests' ? 'app+specs.js' : 'app.js')))
            .pipe(gulp.dest(path + (type == 'tests' ? '/test' : '/dist')))
            .pipe(notify(type.charAt(0).toUpperCase() + type.slice(1) + ' compiled'));
    } else {
        console.log('tsc parameter type needs to be "tests" or "app"');
        return false;
    }
}

function compileSass(name, pathToSass) {
    gulp.src(pathToSass + '/' + name + '.sass')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({
            loadPath: process.cwd() + pathToSass,
            style: 'nested',
            indentedSyntax: true,
            includePaths: pathToSass
        }))
        .pipe(autoprefixer({
            browsers: ['last 20 versions', '> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(notify(name + ' successfully compiled!'));
}

function onError(err) {
    notify.onError({
        title: 'Gulp',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>'
    })(err);

    this.emit('end');
}