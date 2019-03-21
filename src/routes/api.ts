import { json } from "body-parser";
import * as express from "express";

export const register = ( app: express.Application ) => {

    app.get( `/api/test`, /* oidc.ensureAuthenticated(), */ async ( req: any, res ) => {
        try {
            return res.json( '{foo: "bar"}' );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

};
