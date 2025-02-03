import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Keycloak from 'keycloak-js';
import { jwtDecode } from 'jwt-decode';

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
  login: () => void;
  logout: () => void;
  authToken?: string;
  isAuthenticated: boolean;
  user?: UserProfile;
}

type Props = {
  keyCloakConfig: {
    auth_url: string;
    realm: string;
    idp_client_id: string;
    idp_alias: string;
  };
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

let keycloak: Keycloak;

// eslint-disable-next-line react/prop-types
export const AuthStateProvider = ({ children, keyCloakConfig }: Props) => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | undefined>(undefined);

  const login = () => {
    keycloak.login({
      idpHint: keyCloakConfig.idp_alias,
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
        

        keycloak = new Keycloak({
          url: keyCloakConfig.auth_url,
          realm: keyCloakConfig.realm,
          clientId: keyCloakConfig.idp_client_id
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
            })
            .catch((err: Error) => {
              console.log('Failed to refresh token', err);
              logout();
            });
        };

        keycloak
          .init({
            onLoad: 'check-sso',
            checkLoginIframe: false
          })
          .then((auth: boolean) => {
              if (!auth) {
                // If finer control is needed on when to redirect user to SSO login
                // instead of calling login here, call login in the areas that require login (e.g. a login page endpoint)
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
    <AuthContext.Provider value={{ login, logout, authToken, isAuthenticated, user }}>
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