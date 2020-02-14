const { task, src, dest, series, watch, parallel } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const htmlmin = require("gulp-htmlmin");
const includeFile = require("gulp-file-include");
const del = require("del");
const connect = require("gulp-connect");

/**
 * 各种路径
 */
const path = {
  resource: "resource",
  src: "assets",
  dest: "public",
  js: {
    src: "assets/js/**/*.js",
    dest: "public/js"
  },
  css: {
    src: "assets/stylesheet/**/*.css",
    dest: "public/css"
  },
  scss: {
    src: "assets/stylesheet/**/*.scss",
    dest: "public/css"
  },
  html: {
    resource: "resource/html/index.html",
    src: "assets/html/**/*.html"
  },
  favicon: {
    src: "assets/favicon/**/*",
    dest: "public/favicon"
  },
  images: {
    src: "assets/images/**/*",
    dest: "public/images"
  },
  docs: {
    src: "docs/**/*",
    dest: "public/docs"
  }
};

/**
 * 其它设置
 */
// postcss 插件
const config = [autoprefixer(), cssnano()];
// 设置 sass 编译器
sass.compiler = require("node-sass");

/**
 * 任务列表
 */
task("del", () => {
  return del([path.dest, path.resource]);
});

task("cp-favicon", () => {
  return src(path.favicon.src).pipe(dest(path.favicon.dest));
});

task("cp-images", () => {
  return src(path.images.src).pipe(dest(path.images.dest));
});

task("cp-docs", () => {
  return src(path.docs.src).pipe(dest(path.docs.dest));
});

task("js", () => {
  return src(path.js.src)
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(uglify())
    .pipe(dest(path.js.dest));
});

task("css", () => {
  return src(path.css.src)
    .pipe(postcss(config))
    .pipe(dest(path.css.dest));
});

task("scss", () => {
  return src(path.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(config))
    .pipe(dest(path.scss.dest));
});

task("html", () => {
  return src(path.html.src)
    .pipe(includeFile())
    .pipe(dest(path.resource + "/html"));
});

task("html-minify", () => {
  return src(path.html.resource)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyJS: true,
        minifyURLs: true
      })
    )
    .pipe(dest(path.dest))
    .pipe(connect.reload());
});

task("connect", () => {
  return connect.server({
    root: path.dest,
    livereload: true
  });
});

task(
  "build",
  series(
    "del",
    "cp-favicon",
    "cp-images",
    "cp-docs",
    "js",
    "css",
    "scss",
    "html",
    "html-minify"
  )
);

task("watch", () => {
  return watch(
    [path.src, "docs"],
    series(
      "del",
      "cp-favicon",
      "cp-images",
      "cp-docs",
      "js",
      "css",
      "scss",
      "html",
      "html-minify"
    )
  );
});

task("default", parallel("watch", "connect"));
