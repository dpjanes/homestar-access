/*
 *  access.js
 *
 *  David Janes
 *  IOTDB.org
 *  2015-03-30
 *
 *  Copyright [2013-2015] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

/**
 *  Users are redirected to this page when not logged in
 */
var login = function(request, response, locals, done) {
    done(null);
};

/**
 *  List users
 */
var users = function(request, response, locals, done) {
    var homestar = require('./index').homestar;
    locals.users = [];

    homestar.users.users(function(user) {
        if (user) {
            locals.users.push(user);
        } else {
            console.log("USERS", locals.users);
            done(null);
        }
    });
};

/**
 *  Exports
 */
exports.login = login;
exports.users = users;