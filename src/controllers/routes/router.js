import {Logger} from '../../models/logger';
import {Server} from '../../server';
import {MiddleWare} from '../middleware/middleware';
import {ErrorHandler} from '../middleware/errors/errorHandler';
import {StatusCodes} from '../status';
import {Controllers} from '../index';

let app;

export class Router {
    static async initEndpoints() {
        Logger.info('Setting up API HTTP endpoints');

        app = Server.App;

        app.get('/', [MiddleWare.RateLimits.request, Router.frontPage]);
        
        app.post('/user', [MiddleWare.RateLimits.request, Controllers.UserController.newUser]);
        app.post('/login', [MiddleWare.RateLimits.request, Controllers.LoginController.authenticate]);
        app.get('/auth/user/:id', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser]);
        app.delete('/auth/user/:id', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser]);

        app.post('/unauth/permanote', [MiddleWare.RateLimits.request, Controllers.PermaNoteController.newPermaNote]);
        app.get('/note/:endpoint', [MiddleWare.RateLimits.request, Controllers.PermaNoteController.getPermaNote]);

        app.post('/auth/note', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser, Controllers.NoteController.newNote]); // Passes through auth middleware which if authenticated passes user obj and token to the note handling function for it to deal with
        app.post('/auth/group', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser, Controllers.GroupController.newGroup]);

        app.get('/auth/getallnotes', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser]);
        app.get('/auth/getallgroups', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser]);

        app.post('/auth/movenote', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser]);
        app.post('/auth/movegroup', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser]);

        app.delete('/auth/deletenote', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser]);
        app.delete('/auth/deletegroup', [MiddleWare.RateLimits.request, MiddleWare.Auth.authUser]);

        app.get('*', [MiddleWare.RateLimits.request, StatusCodes.pageNotFound]);
        app.use(ErrorHandler.newError);
        
        Logger.info('HTTP endpoints settup');
    }

    static frontPage(req, res, next) {
        res.end('DEVELOPMENT SERVER');
    }
}
