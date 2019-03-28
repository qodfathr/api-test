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
                        name: 'facebook',
                        imageurl: 'https://avatars2.githubusercontent.com/u/69631?s=200&v=4',
                        repositories: [
                            {
                                name: 'react',
                                url: 'https://github.com/facebook/react',
                            },
                            {
                                name: 'react-native',
                                url: 'https://github.com/facebook/react-native',
                            },
                        ],
                    },
                    {
                        name: 'vuejs',
                        imageurl: 'https://avatars3.githubusercontent.com/u/6128107?s=200&v=4',
                        repositories: [
                            {
                                name: 'vue',
                                url: 'https://github.com/vuejs/vue',
                            },
                        ],
                    },
                    {
                        name: 'nodejs',
                        imageurl: 'https://avatars3.githubusercontent.com/u/9950313?s=200&v=4',
                        repositories: [
                            {
                                name: 'node',
                                url: 'https://github.com/nodejs/node',
                            },
                        ],
                    },
                    {
                        name: 'jquery',
                        imageurl: 'https://avatars0.githubusercontent.com/u/70142?s=200&v=4',
                        repositories: [
                            {
                                name: 'jquery',
                                url: 'https://github.com/jquery/jquery',
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
