import {Database} from '../database/database';

export class PermaLink {
    static async genUID() {
        return new Date().getTime();
    }

    static async genEndpoint() {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let endpoint;
        while (true) {
            endpoint = 'P';
            for (let i = 0; i < 7; i++)
                endpoint += possible[Math.floor(Math.random() * possible.length)];

            if (await Database.PermaNotes.getNoteByEndpoint(endpoint) == -1)
                break;
        }

        return endpoint;
    }
}
