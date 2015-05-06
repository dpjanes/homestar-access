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

var iotdb = require('iotdb');
var _ = iotdb._;

var index = require('./index');

/**
 *  Users are redirected to this page when not logged in
 */
var login = function(request, response, locals, done) {
    done(null);
};

/**
 *  List users
 */
var list_users = function(request, response, locals, done) {
    var homestar = require('./index').homestar;

    if (!request.user.is_owner) {
        return done(new Error("only the Owner can list users"));
    }

    locals.users = [];

    homestar.users.users(function(error, user) {
        if (error) {
            done(error);
        } else if (user) {
            locals.users.push(user);
        } else {
            done(null);
        }
    });
};

var _map_group = function(group) {
    return {
        value: group,
        name: group,
        selected: this.indexOf(group) > -1,
    }
};

/**
 *  Edit one user
 */
var edit_user = function(request, response, locals, done) {
    var homestar = index.homestar;

    if (!request.user.is_owner) {
        return done(new Error("only the Owner can edit users"));
    }

    locals.user_id = request.params.user_id;

    homestar.users.user_by_id(locals.user_id, function(error, user) {
        if (error) {
            return done(error);
        } else if (!user) {
            return done(new Error("user not found"));
        }

        locals.edit_user = user;
        locals.user_groups = _.ld.list(user, 'iot:access.group', homestar.data.default_groups());
        locals.groups = _.map(homestar.data.groups(), _map_group, locals.user_groups);

        if (request.method === "POST") {
            var updated = {};

            /*
            var name = request.body['schema:name']
            if (name && name.length && name != locals.metadata['schema:name']) {
                updated['schema:name'] = name;
            }
             */

            var new_groups = _.ld.list(request.body, 'iot:access.group', []);
            if (!_.equals(locals.user_groups, new_groups)) {
                updated['iot:access.group'] = new_groups;
            }

            return done(null, "/admin/users");
        }

        return done(null);
    });
};

/**
 *  Exports
 */
exports.login = login;
exports.list_users = list_users;
exports.edit_user = edit_user;
