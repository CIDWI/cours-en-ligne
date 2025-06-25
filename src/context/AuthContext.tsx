import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Définition du type pour le contexte d'authentification
interface AuthContextData {
  userToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Valeurs par défaut pour le contexte
const defaultAuthContext: AuthContextData = {
  userToken: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
};

export const AuthContext = createContext<AuthContextData>(defaultAuthContext);

// Props du provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Chargement du token au montage
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token chargé depuis AsyncStorage:', token);
        if (token) {
          setUserToken(token);
        }
      } catch (e) {
        console.error('Erreur lors du chargement du token', e);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  // Fonction de connexion
  const login = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      console.log('Utilisateur connecté, token sauvegardé');
    } catch (e) {
      console.error('Erreur lors du login', e);
    }
  };

  // Fonction de déconnexion
  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
      console.log('Utilisateur déconnecté, token supprimé');
    } catch (e) {
      console.error('Erreur lors du logout', e);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};