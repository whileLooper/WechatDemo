'use strict';

const fs = require('fs');
const Promise = require('bluebird');

exports.readFileAsync = function(fpath, encoding) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fpath, encoding, function(err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
};

exports.writeFileAsync = function(fpath, content) {
  console.log('write...');
  return new Promise(function(resolve, reject) {
    fs.writeFile(fpath, content, function(err, content) {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
};