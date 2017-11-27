var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//scripts 
gulp.task('scripts',function(){
  gulp.src(['app/js/**/*.js'])
  .pipe(rename('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('bin'))
  .pipe(reload({stream:true}));
});

//bower tasks js
gulp.task('depsjs',function(){
	return gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/bootstrap/dist/js/bootstrap.min.js'])
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream:true}));
})

//bower task angular
gulp.task('angulardeps',function(){
  return gulp.src(['bower_components/angular/angular.min.js','bower_components/angular-route/angular-route.min.js','bower_components/firebase/firebase.js','bower_components/angularfire/dist/angularfire.min.js'])
  .pipe(gulp.dest('app/js/lib'))
  .pipe(reload({stream:true}));
});



//bower task css 

gulp.task('depscss',function(){
  return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css'])
  .pipe(gulp.dest('app/css'))
  .pipe(gulp.dest('app/css'))
  .pipe(reload({stream:true}));
});

//css
gulp.task('css',function(){
 gulp.src(['app/css/**/*.css'])
 .pipe(reload({stream:true}));
});

//html
gulp.task('html',function(){
  gulp.src(['app/**/*.html'])
  .pipe(reload({stream:true}));
});

//browserSync 
gulp.task('browser-sync',function(){
  browserSync({
     server:{
     	baseDir:'app'
     }
  });
});

//watch
gulp.task('watch',function(){
  gulp.watch('app/js/**/*.js',['scripts']);
  gulp.watch('app/css/**/*.css',['css']);
  gulp.watch('app/**/*.html',['html']);
});

//default
gulp.task('default',['scripts','watch','html','css','depscss','depsjs','angulardeps','scripts','browser-sync']);