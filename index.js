#! /usr/bin/env node

var proc = require('child_process');
var fs = require('fs');

var path = process.argv[2] || '.';

fs.readdir(path, function (err, files) {
  if (err) throw new Error('error: ' + err);

  // remove .DS_Store
  var index = files.indexOf('.DS_Store');
  if (index > -1) {
    files.splice(index, 1);
  }

  for (var i = 0; i < files.length; i += 1) {
    var cmd = 'tar --exclude="node_modules" --exclude="bower_components" --exclude=".sass-cache" -zcvf ' + path + '/' + files[i] + '.tar.gz ' + path + '/' + files[i];

    proc.exec(cmd, function (err, stdout, stderr) {
      if (err) throw new Error(err);


      console.log('stdout:' + stdout);
      console.log('stderr:' + stderr);
    });
  }



});

