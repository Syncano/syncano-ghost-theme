'use strict';

var gulp 		= require('gulp'),
	del 		= require('del'),
	concat 		= require('gulp-concat'),
	rename 		= require('gulp-rename'),
	uglify 		= require('gulp-uglify'),
	sass 		= require('gulp-sass'),
	csso 		= require('gulp-csso'),
	watch 		= require('gulp-watch'),
	livereload 	= require('gulp-livereload');

gulp.task('styles', function() {
	return gulp.src('src/sass/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(rename("theme.min.css"))
		.pipe(gulp.dest('assets/css'));
});

gulp.task('scripts', function() {
	return gulp.src(['src/js/plugin/*.js', 'src/js/base.js'])
		.pipe(uglify())
		.pipe(concat('theme.min.js'))
		.pipe(gulp.dest('assets/js'));
});

gulp.task('ghost_config', ['scripts'], function() {
	return gulp.src(['src/js/config.js', 'assets/js/theme.min.js'])
		.pipe(concat('theme.min.js'))
		.pipe(gulp.dest('assets/js'));
});

gulp.task('default', function() {
	gulp.start('styles', 'scripts', 'ghost_config', 'watch');
});

gulp.task('watch', function() {
	gulp.watch('src/sass/*.scss', ['styles']);
	gulp.watch('src/js/*.js', ['scripts', 'ghost_config']);
	livereload.listen();
	gulp.watch(['*']).on('change', livereload.changed);
});
