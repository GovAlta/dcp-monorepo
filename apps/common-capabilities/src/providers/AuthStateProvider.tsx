import React, { createContext, useContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";

type AuthContextProps = {
  logout: () => void;
  authToken?: string;
  isAuthenticated: boolean;
}

// Create an Auth Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Initialize Keycloak instance
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
    keycloak.logout(); // TODO what to do after logging out
  }

  // TODO need to verify if token generation can be longer and ask about how long it should be with Sanchit
  useEffect(() => {
    if (!keycloak) {
        keycloak = new Keycloak({
            url: 'https://access-uat.alberta.ca/auth',
            realm: '9b2d9233-4d9f-432d-9471-9f95861db16d',
            clientId: 'urn:ads:cc:uiam_saml'
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
                    console.log("Keycloak initialized with token", keycloak.token); // REMOVE THIS AFTER TESTING
                    setAuthToken(keycloak.token);
                    setIsAuthenticated(true);
                }
            })
            .catch((err: Error) => console.error("Keycloak failed to initialize with error=", err));
        }
  }, []);

  return (
    // <AuthContext.Provider value={{ login, logout, authToken }}>
    <AuthContext.Provider value={{ logout, authToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthStateProvider");
  }
  
  return context;
};