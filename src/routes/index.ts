import * as express from "express";
import Keycloak from "keycloak-connect";
import * as api from "./api";

// import { KeycloakFactory } from "../keycloak";

export const register = ( app: express.Application, keycloak: Keycloak ) => {
    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        res.send( "Hello world!" );
    } );

    api.register( app, keycloak );
};
