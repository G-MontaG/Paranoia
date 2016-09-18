const gulp = require('gulp');

// Create an electron-connect server to enable reloading
const electron = require('electron-connect').server.create({path: "build/init.js"});

gulp.task('start', ()=>{
  electron.start();
  //Watch js files and restart Electron if they change
  gulp.watch(['build/*.js', '!build/main.js', '!build/vendors.js'], electron.restart);
  //watch css files, but only reload (no restart necessary)
  gulp.watch(['build/main.js', 'build/vendors.js', 'build/main.css'], electron.reload);
  //watch html
  gulp.watch(['build/index.html'], electron.reload);
});