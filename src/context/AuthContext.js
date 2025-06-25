// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // On initialise le contexte avec une valeur par défaut
// export const AuthContext = createContext({
//   userToken: null,
//   login: async () => {},
//   logout: async () => {},
//   loading: true,
// });

// export function AuthProvider({ children }) {
//   const [userToken, setUserToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         setUserToken(token);
//       } catch (e) {
//         console.error('Erreur lors du chargement du token', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadToken();
//   }, []);

//   const login = async (token) => {
//     setUserToken(token);
//     await AsyncStorage.setItem('userToken', token);
//   };

//   const logout = async () => {
//     setUserToken(null);
//     await AsyncStorage.removeItem('userToken');
//   };

//   return (
//     <AuthContext.Provider value={{ userToken, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const AuthContext = createContext({
//   userToken: null,
//   login: async () => {},
//   logout: async () => {},
//   loading: true,
// });

// export function AuthProvider({ children }) {
//   const [userToken, setUserToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         console.log('Token chargé depuis AsyncStorage:', token);
//         setUserToken(token);
//       } catch (e) {
//         console.error('Erreur lors du chargement du token', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadToken();
//   }, []);

//   const login = async (token) => {
//     setUserToken(token);
//     await AsyncStorage.setItem('userToken', token);
//     console.log('Utilisateur connecté, token sauvegardé');
//   };

//   const logout = async () => {
//     setUserToken(null);
//     await AsyncStorage.removeItem('userToken');
//     console.log('Utilisateur déconnecté, token supprimé');
//   };

//   return (
//     <AuthContext.Provider value={{ userToken, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  userToken: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token chargé depuis AsyncStorage:', token);
        if (token) setUserToken(token);
      } catch (e) {
        console.error('Erreur lors du chargement du token', e);
      } finally {
        setLoading(false); // 🔧 indispensable pour éviter le loader infini
      }
    };

    loadToken();
  }, []);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      console.log('Utilisateur connecté, token sauvegardé');
    } catch (e) {
      console.error('Erreur lors du login', e);
    }
  };

  const logout = async () => {
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
