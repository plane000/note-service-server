import Sequelize from 'sequelize';

import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class Database extends BaseDatabase {
    static async exec(query) {
        let connection = BaseDatabase.Connection;
        let res;

        let promise = new Promise((resolve, reject) => {
            connection
                .query(query)
                .then(result => {
                    Logger.database(JSON.stringify(res, null, 4));
                    res = result[0][0].result;
                    resolve();
                })
                .catch(err => {
                    Logger.error('An error occured while querying a database: ' + err);
                    reject()
                });
        });

        await promise;
        return res;
    }
}

Database.users = require('./users').UserTools;
Database.auth = require('./tokens').TokenTools;
Database.permalink = require('./permalinks').PermaLinkTools;
Database.notegroup = require('./notegroups').NoteGroupTools;
Database.note = require('./notes').NoteTools;
