import React, { createContext, useContext, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import { jwtDecode } from 'jwt-decode';
import { getAdspConfigs, SAML_CLIENT_ID } from '../utils/configs';

type JWTUserPayload = {
  given_name: string;
  family_name: string;
  email: string;
}

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
}

type AuthContextProps = {
  logout: () => void;
  authToken?: string;
  isAuthenticated: boolean;
  user?: UserProfile;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

let keycloak: Keycloak;

// eslint-disable-next-line react/prop-types
export const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | undefined>(undefined);

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
    if (isAuthenticated && authToken) {
      const decoded = jwtDecode<JWTUserPayload>(authToken);
      
      setUser({ 
        firstName: decoded.given_name, 
        lastName: decoded.family_name, 
        email: decoded.email 
      });
    } else {
      setUser(undefined);
    }
  }, [isAuthenticated, authToken]);

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
            .catch((err: Error) => console.error('Keycloak failed to initialize with error=', err));
        }
  }, []);

  return (
    <AuthContext.Provider value={{ logout, authToken, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthStateProvider');
  }
  
  return context;
};