import { json } from 'body-parser';
import * as express from 'express';
import Keycloak from 'keycloak-connect';
import * as supportedrepos from './api/supported-repos';

export const register = ( app: express.Application, keycloak: Keycloak ) => {
    supportedrepos.register(app, keycloak);
    app.get( `/api/test`, async ( req: any, res ) => {
        try {
            return res.json( '{foo: "bar"}' );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.get('/clear', async (req, res) => {
        res.send('clearHandler!');
    } );
    app.get('/secure', keycloak.protect(), async (req, res) => {
        // tslint:disable-next-line:no-console
        console.log('secure');
        res.send('secureHandler!');
    });
    app.get('/roleneeded', keycloak.protect('magicrole'), async (req, res) => {
        res.send('roleneededHandler!');
    } );
    app.get('/lvroleneeded', keycloak.protect('lyfevestio:lvsupportedreposadmin'), async (req, res) => {
        res.send('lvroleneededHandler!');
    } );
};

export function APIROUTE(route: string) {
    return '/api/v1' + route;
}
