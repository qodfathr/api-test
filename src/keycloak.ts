import Keycloak from "keycloak-connect";

export class KeycloakFactory {
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Keycloak {
        if (!KeycloakFactory.instance) {
            KeycloakFactory.instance = new Keycloak( { scope: "openid" });
        }

        return KeycloakFactory.instance;
    }

    private static instance: Keycloak;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }
}
