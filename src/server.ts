import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import Keycloak from "keycloak-connect";
import * as routes from "./routes";

// https://developer.okta.com/blog/2018/11/15/node-express-typescript

dotenv.config();
const port = Number(process.env.SERVER_PORT);

const app = express();
const sess = session({secret: "keyboard dog", resave: false});

const keycloak = new Keycloak({ store: sess });

app.use( sess, keycloak.middleware() );

app.use(express.json());

// Configure routes
routes.register( app, keycloak );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
