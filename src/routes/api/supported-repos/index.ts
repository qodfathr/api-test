import * as express from 'express';
import Keycloak from 'keycloak-connect';
import { APIROUTE } from '../../api';

export const register = ( app: express.Application, keycloak: Keycloak ) => {
    // no auth required

    // logged in required
    app.get(APIROUTE('/supportedrepos'), keycloak.protect(), async (req, res) => {
        const githubToken = req.header('X-LV-Github-Token');
        return res.json(
            { data: {
                organizations: [
                    {
                        name: 'org1',
                        repositories: [
                            {
                                name: 'repo1',
                                url: 'https://github.com/org1/repo1',
                            },
                            {
                                name: 'repo2',
                                url: 'https://github.com/org1/repo2',
                            },
                        ],
                    },
                    {
                        name: 'org2',
                        repositories: [
                            {
                                name: 'repo3',
                                url: 'https://github.com/org1/repo3',
                            },
                        ],
                    },
                ],
            }},
        );
    });
    app.get('/secure', keycloak.protect(), async (req, res) => {
        // tslint:disable-next-line:no-console
        console.log('secure');
        res.send('secureHandler!');
    });

    // magicrole required
    app.get('/roleneeded', keycloak.protect('magicrole'), async (req, res) => {
        res.send('roleneededHandler!');
    } );

    // lyfevestio:lvsupportedreposadmin required
    app.get('/lvroleneeded', keycloak.protect('lyfevestio:lvsupportedreposadmin'), async (req, res) => {
        res.send('lvroleneededHandler!');
    } );

};
