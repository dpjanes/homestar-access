/*
 *  index.js
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

var iotdb = require('iotdb');
var _ = iotdb._;

var path = require('path');

var access = require("./access");

exports.homestar = null;
exports.web = {
    setup: function(app, homestar) {
        exports.homestar = homestar;

        /* force logins */
        _.d.set(homestar.settings, "/webserver/require_login", true);
        _.d.set(homestar.settings, "/webserver/urls/login", "/admin/log/in");

        app.get("/admin/log/in", homestar.make_dynamic({
            template: path.join(__dirname, "dynamic/login.html"),
            customize: access.login,
            require_login: false,
        }));
    },
    locals: {
        metadata_editor: true
    },
}
