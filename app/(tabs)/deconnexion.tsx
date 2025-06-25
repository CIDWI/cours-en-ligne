// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';

// export default function Deconnexion() {
//   const router = useRouter();

//   const handleDeconnexion = async () => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       Alert.alert('Déconnexion', 'Vous avez été déconnecté.');
//       router.replace('/'); // ou '/connexionScreen' selon ton routing
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//       Alert.alert('Erreur', 'Impossible de se déconnecter.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profil</Text>
//       <TouchableOpacity style={styles.button} onPress={handleDeconnexion}>
//         <Text style={styles.buttonText}>Se déconnecter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 24,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 40,
//   },
//   button: {
//     backgroundColor: '#dc3545',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '80%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });





// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';

// export default function Deconnexion() {
//   const router = useRouter();

//   const handleDeconnexion = async () => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       console.log('Token supprimé, déconnexion réussie');
//       Alert.alert('Déconnexion', 'Vous avez été déconnecté.', [
//         {
//           text: 'OK',
//           onPress: () => router.replace('/'), // Ou '/connexionScreen' si tu as une page dédiée
//         },
//       ]);
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion :', error);
//       Alert.alert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profil</Text>
//       <TouchableOpacity style={styles.button} onPress={handleDeconnexion}>
//         <Text style={styles.buttonText}>Se déconnecter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 24,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 40,
//   },
//   button: {
//     backgroundColor: '#dc3545',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '80%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });























// // AuthContext.tsx
// import React, { useContext, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// // Ajuste le chemin relatif selon l'emplacement réel de AuthContext.tsx
// import { AuthContext } from '../../src/contexts/AuthContext';

// export default function DeconnexionScreen() {
//   const { logout, userToken } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!userToken) {
//       // Si déjà déconnecté, redirige vers la page de connexion
//       router.replace('/connexion');
//     }
//   }, [userToken]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.replace('/connexion'); // Redirection immédiate après logout
//     } catch (error) {
//       Alert.alert("Erreur", "Une erreur est survenue lors de la déconnexion.");
//       console.error("Erreur déconnexion :", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.message}>Souhaitez-vous vous déconnecter ?</Text>
//       <Button title="Se déconnecter" onPress={handleLogout} color="#d9534f" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   message: {
//     fontSize: 18,
//     marginBottom: 20,
//     fontWeight: '500',
//   },
// });

// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import { useRouter, useRootNavigationState } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// export default function Deconnexion() {
//   const { logout, userToken } = useContext(AuthContext);
//   const router = useRouter();
//   const navigationState = useRootNavigationState();

//   const [hasRedirected, setHasRedirected] = useState(false);

//   useEffect(() => {
//     // Attendre que la navigation soit prête
//     if (!navigationState?.key || hasRedirected) return;

//     if (!userToken) {
//       setHasRedirected(true); // éviter les appels multiples
//       router.replace('/connexion');
//     }
//   }, [userToken, navigationState?.key]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       setHasRedirected(true);
//       router.replace('/connexion');
//     } catch (error) {
//       Alert.alert("Erreur", "Une erreur est survenue lors de la déconnexion.");
//       console.error("Erreur déconnexion :", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.message}>Souhaitez-vous vous déconnecter ?</Text>
//       <Button title="Se déconnecter" onPress={handleLogout} color="#d9534f" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   message: {
//     fontSize: 18,
//     marginBottom: 20,
//     fontWeight: '500',
//   },
// });







// import React, { useContext } from 'react';
// import { View, Button, StyleSheet, Text } from 'react-native';
// import { AuthContext } from '../../src/contexts/AuthContext';

// const LogoutScreen: React.FC = () => {
//   // Récupère la fonction logout typée depuis le contexte
//   const { logout } = useContext(AuthContext);

//   const handleLogout = (): void => {
//     logout();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Déconnexion</Text>
//       <Button title="Se déconnecter" onPress={handleLogout} />
//     </View>
//   );
// };

// export default LogoutScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     fontWeight: '600',
//     color: '#333333',
//   },
// });





















import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Alert, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../src/context/AuthContext';
// Si vous utilisez React Query :
import { useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

const LogoutScreen: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const queryClient = useQueryClient(); // pour React Query

  const handleLogout = async (): Promise<void> => {
    try {
      // 1. action de déconnexion (suppression token côté contexte / back)
      await logout();

      // 2. vider AsyncStorage (tous les items stockés)
      await AsyncStorage.clear();

      // 3. vider le cache de React Query (si utilisé)
      queryClient.clear();

      // 4. redirection vers l'écran de connexion
      router.replace('/connexion');
    } catch (err) {
      Alert.alert(
        'Erreur',
        'Une erreur est survenue pendant la déconnexion.'
      );
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Déconnexion</Text>
      <Button title="Se déconnecter" onPress={handleLogout} />
 
    </View>

  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: '600',
    color: '#333333',
  },
 homeButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#eee',
    gap: 8,
  },
  homeText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#6c5ce7',
    fontWeight: '500',
  },
});




































































// import React, { useContext } from 'react';
// import { View, Button, StyleSheet, Text, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// const LogoutScreen: React.FC = () => {
//   const { logout } = useContext(AuthContext);
//   const router = useRouter();

//   const handleLogout = async (): Promise<void> => {
//     try {
//       await logout();
//       // router.replace('/connexion'); // Redirige vers l'écran de connexion
//     } catch (err) {
//       Alert.alert('Erreur', 'Une erreur est survenue pendant la déconnexion.');
//       console.error(err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Déconnexion</Text>
//       <Button title="Se déconnecter" onPress={handleLogout} />
//     </View>
//   );
// };

// export default LogoutScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     fontWeight: '600',
//     color: '#333333',
//   },
// });
























// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type AuthContextType = {
//   userToken: string | null;
//   loading: boolean;
//   login: (token: string) => Promise<void>;
//   logout: () => Promise<void>;
// };

// export const AuthContext = createContext<AuthContextType>({
//   userToken: null,
//   loading: true,
//   login: async () => {},
//   logout: async () => {},
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [userToken, setUserToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Au démarrage, charge le token
//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         setUserToken(token);
//       } catch (e) {
//         console.error('Erreur récupération token:', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadToken();
//   }, []);

//   const login = async (token: string) => {
//     try {
//       await AsyncStorage.setItem('userToken', token);
//       setUserToken(token);
//     } catch (e) {
//       console.error('Erreur login:', e);
//     }
//   };

//   const logout = async () => {
//     try {
//       setLoading(true);
//       await AsyncStorage.removeItem('userToken');
//       setUserToken(null);
//     } catch (e) {
//       console.error('Erreur logout:', e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ userToken, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
