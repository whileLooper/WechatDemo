'use strict';
const path = require('path');
const util = require('../libs/util.js');
const wechat_file = path.join(__dirname, './wechat.txt');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1516677943930_1131';

  // wechat config
  config.initWechat = {
    token: 'bhu89ijnmko0',
    // appID: 'wxd61026a80b610e7c',
    // appSecret: '7b9dde29e00e60d9474551e06e409c3f587a45fca820916e183acca9e41839e',
    appID: 'wx58080b1fe9cb4f49',
    appid: 'wx58080b1fe9cb4f49',
    appSecret: '9dba811200ddd73da9a24d7f36762485',
    encodingAESKey: 'HX2DzbFRh9qY4toNv9XVL1kYxgoYCTwoZ3haN92kAzl',
    getAccessToken() {
      return util.readFileAsync(wechat_file);
    },
    saveAccessToken(data) {
      data = JSON.stringify(data);
      return util.writeFileAsync(wechat_file, data);
    },
  };

  // disable csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // view engine
  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  // firebase configuration
  config.firebase = {
    apiKey: 'AIzaSyCY-ZnN4VWU6As0ZzGAWlPXmXwEpEhLVzY',
    authDomain: 'radiancestudio-16ba4.firebaseapp.com',
    databaseURL: 'https://radiancestudio-16ba4.firebaseio.com',
    projectId: 'radiancestudio-16ba4',
    storageBucket: 'radiancestudio-16ba4.appspot.com',
    messagingSenderId: '401950336399',
  };

  return config;
};
