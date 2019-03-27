import { json } from "body-parser";
import * as express from "express";
import Keycloak from "keycloak-connect";

// import { KeycloakFactory } from "../keycloak";

export const register = ( app: express.Application, keycloak: Keycloak ) => {
    // const keycloak = KeycloakFactory.getInstance();
    // tslint:disable-next-line:no-console
    console.log(keycloak.accountUrl());

    app.get( `/api/test`, /* oidc.ensureAuthenticated(), */ async ( req: any, res ) => {
        try {
            return res.json( '{foo: "bar"}' );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.get("/clear", async (req, res) => {
        res.send("clearHandler!");
    } );
    app.get("/secure", keycloak.protect(), async (req, res) => {
        // tslint:disable-next-line:no-console
        console.log("secure");
        res.send("secureHandler!");
    });
    app.get("/roleneeded", keycloak.protect("magicrole"), async (req, res) => {
        res.send("roleneededHandler!");
    } );
    app.get("/lvroleneeded", keycloak.protect("lyfevestio:lvsupportedreposadmin"), async (req, res) => {
        res.send("lvroleneededHandler!");
    } );
};
