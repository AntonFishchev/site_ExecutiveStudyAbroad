const project_folder = "dist";
const source_folder = "#src";

let fs = require("fs");

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        images: project_folder + "/images/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        images: source_folder + "/images/**/*.+(png|jpg|gif|ico|svg|webp)",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        images: source_folder + "/images/**/*.+(png|jpg|gif|ico|svg|webp)",
    },
    clean: "./" + project_folder + "/",
};

// Объявление все модулей
let { src, dest } = require("gulp"),
    gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    fileInclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass")(require("sass")),
    autoprefixer = require("gulp-autoprefixer"),
    groupMedia = require("gulp-group-css-media-queries"),
    cleanCss = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglifyEs = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter");

// Запуск сервера для перезагрузки страницы
function pageReload(params) {
    browserSync.init({
        server: {
            baseDir: "./" + project_folder + "/",
        },
        port: 3000,
        notify: false,
    });
}

// Создание html файла в папке dist
function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream());
}

// Создание css файла в папке dist и компиляция sass
function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded",
            }).on("error", scss.logError)
        )
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true,
            })
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: ".min.css",
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream());
}

// Создание js файла в папке dist
function js() {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(uglifyEs())
        .pipe(
            rename({
                extname: ".min.js",
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream());
}

function img() {
    return src(path.src.images)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest(path.build.images))
        .pipe(browserSync.stream());
}

function fonts(params) {
    src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
    return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

gulp.task("otf2ttf", () => {
    return src([source_folder + "/fonts/*.otf"])
        .pipe(
            fonter({
                formats: ["ttf"],
            })
        )
        .pipe(dest(source_folder + "/fonts"));
});

function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + "/scss/fonts.scss");
    if (file_content == "") {
        fs.writeFile(source_folder + "/scss/fonts.scss", "", cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split(".");
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(
                            source_folder + "/scss/fonts.scss",
                            '@include font("' +
                                fontname +
                                '", "' +
                                fontname +
                                '", "400", "normal");\r\n',
                            cb
                        );
                    }
                    c_fontname = fontname;
                }
            }
        });
    }
}

function cb() {}

// Автоматическая перезагрузка страницы при изменени в папке src
function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], img);
}

// Удаление папки dist при новой сборке gulp
function clean(params) {
    return del(path.clean);
}

let build = gulp.series(
    clean,
    gulp.parallel(js, css, html, img, fonts),
    fontsStyle
);
let watch = gulp.parallel(build, watchFiles, pageReload);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
