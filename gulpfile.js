const gulp = require("gulp");
const mocha = require("gulp-mocha");

gulp.task("test",function () {
    return gulp.src("Test/apiTest.js").pipe(mocha());
})
gulp.task("watch",function () {
    gulp.watch(["api.js","Test/apiTest.js"],["test"]);
})


