// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function ProfilScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profil</Text>
//       <Text style={styles.label}>Nom : Dupont</Text>
//       <Text style={styles.label}>Prénom : Jean</Text>
//       <Text style={styles.label}>Classe : BTS SIO</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     alignSelf: 'center',
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ProfilScreen() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         const userId = await AsyncStorage.getItem('userId');
//         console.log(userId);
//         console.log(token);
//       //  const token = await AsyncStorage.getItem('userToken');

//         if (!token || !userId) {
//           console.warn('❌ Token ou ID utilisateur manquant dans AsyncStorage');
//           throw new Error('Token ou ID utilisateur manquant ou invalide');
//         }

//         console.log('🔐 Token utilisé :', token);
//         console.log('🆔 ID utilisateur :', userId);

//         const response = await fetch(`http://192.168.1.85:3000/user/${userId}`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error(`❌ Erreur HTTP ${response.status} : ${errorText}`);
//           throw new Error('Erreur lors de la récupération des infos utilisateur');
//         }

//         const data = await response.json();
//         console.log('✅ Données utilisateur reçues :', data);

//         setUser(data);
//       } catch (err: any) {
//         console.error('❗Erreur dans fetchUser :', err.message);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;
//   }

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Erreur lors du chargement de lutilisateur.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profil</Text>
//       <Text style={styles.label}>Nom : {user.lastName}</Text>
//       <Text style={styles.label}>Prénom : {user.firstName}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     alignSelf: 'center',
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ProfilScreen() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserFromAdvancement = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         if (!token) throw new Error('Token manquant');

//         // const response = await fetch('http://192.168.1.85:3000/advancement', {
            
//              const response = await fetch('http://192.168.1.17:3000/advancement', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Erreur HTTP ${response.status} : ${errorText}`);
//         }

//         const data = await response.json();

//         if (Array.isArray(data) && data.length > 0 && data[0].user) {
//           setUser(data[0].user);
//         } else {
//           throw new Error('Données utilisateur non trouvées');
//         }

//       } catch (err: any) {
//         console.error('❗Erreur dans fetchUserFromAdvancement :', err.message);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserFromAdvancement();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;
//   }

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Erreur lors du chargement de lutilisateur.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profil</Text>
//       <Text style={styles.label}>Nom : {user.lastName}</Text>
//       <Text style={styles.label}>Prénom : {user.firstName}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     alignSelf: 'center',
//     fontWeight: 'bold',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// export default function ProfilScreen() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserFromAdvancement = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         if (!token) throw new Error('Token manquant');

//         // const response = await fetch('http://192.168.1.85:3000/advancement', {
            
//              const response = await fetch('http://192.168.1.17:3000/advancement', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Erreur HTTP ${response.status} : ${errorText}`);
//         }

//         const data = await response.json();

//         if (Array.isArray(data) && data.length > 0 && data[0].user) {
//           setUser(data[0].user);
//         } else {
//           throw new Error('Données utilisateur non trouvées');
//         }

//       } catch (err: any) {
//         console.error('❗Erreur dans fetchUserFromAdvancement :', err.message);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserFromAdvancement();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;
//   }

//   if (!user) {
//     return (
//       <View style={styles.loaderContainer}>
//         <Text style={styles.error}>Erreur lors du chargement de lutilisateur.</Text>
//       </View>
//     );
//   }

//    return (
//     <ImageBackground
//       source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1050&q=80' }}
//       style={styles.background}
//       blurRadius={4}
//     >
//       <StatusBar barStyle="light-content" />
//       <View style={styles.overlay}>
//         <View style={styles.card}>
//           <Text style={styles.title}>👤 Profil</Text>

//           <View style={styles.infoRow}>
//             <Ionicons name="person" size={20} color="#fff" />
//             <Text style={styles.label}>Nom</Text>
//             <Text style={styles.value}>{user.lastName}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Ionicons name="person-outline" size={20} color="#fff" />
//             <Text style={styles.label}>Prénom</Text>
//             <Text style={styles.value}>{user.firstName}</Text>
//           </View>
//         </View>
//           <TouchableOpacity
//               onPress={() => router.replace('/accueil')}
//               style={styles.homeButton}
//               activeOpacity={0.7}
//             >
//               <Ionicons name="home-outline" size={24} color="#6c5ce7" />
//               <Text style={styles.homeText}>Accueil</Text>
//             </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     backgroundColor: '#1e1e2f',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   error: {
//     color: 'white',
//     fontSize: 16,
//   },
//   background: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(20,20,40,0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 24,
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 20,
//     padding: 28,
//     width: '100%',
//     maxWidth: 360,
//     backdropFilter: 'blur(20px)',
//     borderColor: 'rgba(255,255,255,0.2)',
//     borderWidth: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 20,
//     shadowOffset: { width: 0, height: 10 },
//   },
//   title: {
//     fontFamily: 'Quicksand_400Regular',
//     fontSize: 26,
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   infoRow: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 14,
//     color: '#aaa',
//     marginTop: 4,
//   },
//   value: {
//     fontSize: 20,
//     color: '#fff',
//     fontFamily: 'Quicksand_400Regular',
//     marginTop: 4,
//   },
//   homeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 30,
//     marginTop: 32,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   homeText: {
//     color: '#6c5ce7',
//     fontSize: 18,
//     marginLeft: 8,
//     fontFamily: 'Quicksand_400Regular',
//   },
// });
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {jwtDecode} from 'jwt-decode';

type DecodedToken = {
  id: number;
  role: string;
};

type UserInfo = {
  firstName: string;
  lastName: string;
};

export default function ProfilScreen() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('Token manquant');

        // Décoder le token pour récupérer l'id
        const decoded: DecodedToken = jwtDecode(token);

        // Faire une requête API pour récupérer les infos user via l'id
        // const response = await fetch(`http://192.168.1.17:3000/user/${decoded.id}`, {
           const response = await fetch(`http://192.168.1.85:3000/user/${decoded.id}`, {
//              const response = await fetch('http://192.168.1.17:3000/advancement', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations utilisateur');
        }

        const userData: UserInfo = await response.json();

        setUser(userData);
      } catch (err: any) {
        console.error('Erreur:', err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFromToken();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;
  }

  if (!user) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.error}>Erreur lors du chargement de l'utilisateur.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1050&q=80' }}
      style={styles.background}
      blurRadius={4}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>👤 Profil</Text>

          <View style={styles.infoRow}>
            <Ionicons name="person" size={20} color="#fff" />
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.value}>{user.lastName || '(inconnu)'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#fff" />
            <Text style={styles.label}>Prénom</Text>
            <Text style={styles.value}>{user.firstName || 'Utilisateur'}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.replace('/accueil')}
          style={styles.homeButton}
          activeOpacity={0.7}
        >
          <Ionicons name="home-outline" size={24} color="#6c5ce7" />
          <Text style={styles.homeText}>Accueil</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Styles identiques à ton code initial

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'white',
    fontSize: 16,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20,20,40,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  title: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  infoRow: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  value: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Quicksand_400Regular',
    marginTop: 4,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 32,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  homeText: {
    color: '#6c5ce7',
    fontSize: 18,
    marginLeft: 8,
    fontFamily: 'Quicksand_400Regular',
  },
});
