'use strict';

const Controller = require('egg').Controller;
const firebase = require('firebase');

class AdminController extends Controller {

  async render() {
    // Initialize Firebase
    // firebase.initializeApp(this.config.firebase);
    if (!firebase.apps.length) {
      firebase.initializeApp(this.config.firebase);
      const database = firebase.database();
      // console.log(database.ref('radiancestudio-16ba4/log'));
      database.ref('/').push({
        name: 'hello',
      });
    }

    const ctx = this.ctx;
    await ctx.render('home.html', {
      user: {
        name: 'foobar',
      },
      title: 'egg view example',
    });
  }
}

module.exports = AdminController;
