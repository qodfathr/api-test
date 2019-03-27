import * as express from 'express';
import Keycloak from 'keycloak-connect';
import * as api from './api';

export const register = ( app: express.Application, keycloak: Keycloak ) => {
    // register api routes
    api.register( app, keycloak );
};
