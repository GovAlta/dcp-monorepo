import React, { createContext, useContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import { getAdspConfigs, SAML_CLIENT_ID } from "../utils/configs";

type AuthContextProps = {
  logout: () => void;
  authToken?: string;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

let keycloak: Keycloak;

// eslint-disable-next-line react/prop-types
export const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => {
    keycloak.login({
        idpHint: 'saml',
        redirectUri: window.location.href
    });
  }

  const logout = () => {
    setIsAuthenticated(false);
    keycloak.logout();
  }

  useEffect(() => {
    if (!keycloak) {
        const adspConfigs = getAdspConfigs();

        keycloak = new Keycloak({
            url: adspConfigs.auth_url,
            realm: adspConfigs.realm,
            clientId: SAML_CLIENT_ID
        });

        keycloak.onTokenExpired = () => {
            setAuthToken(undefined);
            setIsAuthenticated(false);

            keycloak
                .updateToken(30)
                .then((refreshed: boolean) => {
                    if (refreshed) {
                        setAuthToken(keycloak.token);
                        setIsAuthenticated(true);
                    }
                });
        };

        keycloak
            .init({
                onLoad: 'check-sso',
                checkLoginIframe: false
            })
            .then((auth: boolean) => {
                if (!auth) {
                    login();
                } else {
                    setAuthToken(keycloak.token);
                    setIsAuthenticated(true);
                }
            })
            .catch((err: Error) => console.error("Keycloak failed to initialize with error=", err));
        }
  }, []);

  return (
    <AuthContext.Provider value={{ logout, authToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthStateProvider");
  }
  
  return context;
};