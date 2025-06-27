// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';

// export default function Profil() {
//   return (
//     <View style={styles.container}>
//       {/* Avatar utilisateur */}
      

//       {/* Nom & rôle */}
//       <Text style={styles.name}>Yoel Sillam</Text>
//       <Text style={styles.role}>Web Designer & Game Artist</Text>

//       {/* Infos dans une card stylée */}
//       <View style={styles.card}>
//         <View style={styles.row}>
//           <Text style={styles.label}>Email :</Text>
//           <Text style={styles.value}>yoel@example.com</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Ville :</Text>
//           <Text style={styles.value}>Pantin</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Entreprise :</Text>
//           <Text style={styles.value}>La Compagnie du Blanc</Text>
//         </View>
//       </View>

//       {/* Boutons */}
//       <View style={styles.buttons}>
//         <TouchableOpacity style={styles.primaryButton}>
//           <Ionicons name="create-outline" size={18} color="white" />
//           <Text style={styles.primaryText}>Modifier</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => router.push('/connexion')}
//         >
//           <Ionicons name="log-out-outline" size={18} color="#007AFF" />
//           <Text style={styles.secondaryText}>Déconnexion</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 80,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 16,
//     borderColor: '#007AFF',
//     borderWidth: 3,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#222',
//   },
//   role: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 30,
//   },
//   card: {
//     backgroundColor: '#F0F4F8',
//     width: '100%',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 15,
//     color: '#555',
//   },
//   value: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#222',
//   },
//   buttons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   primaryText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   secondaryButton: {
//     backgroundColor: '#EAF2FF',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   secondaryText: {
//     color: '#007AFF',
//     fontSize: 16,
//     marginLeft: 8,
//   },
// });

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Profil() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const userId = await AsyncStorage.getItem('userId'); // supposé que tu le stockes aussi

//         if (!token || !userId) {
//           throw new Error('Token ou ID utilisateur manquant');
//         }

//         const response = await fetch(`http://192.168.1.85:3000/users/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Erreur lors de la récupération des infos utilisateur');
//         }

//         const data = await response.json();
//         setUser(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;
//   }

//   return (
//     <View style={styles.container}>
//       {/* Nom & rôle */}
//       <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
//       <Text style={styles.role}>{user?.role ?? 'Utilisateur'}</Text>

//       {/* Infos dans une card stylée */}
//       <View style={styles.card}>
//         <View style={styles.row}>
//           <Text style={styles.label}>Email :</Text>
//           <Text style={styles.value}>{user?.login}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Ville :</Text>
//           <Text style={styles.value}>Pantin</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Entreprise :</Text>
//           <Text style={styles.value}>La Compagnie du Blanc</Text>
//         </View>
//       </View>

//       {/* Boutons */}
//       <View style={styles.buttons}>
//         <TouchableOpacity style={styles.primaryButton}>
//           <Ionicons name="create-outline" size={18} color="white" />
//           <Text style={styles.primaryText}>Modifier</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => {
//             AsyncStorage.removeItem('token');
//             AsyncStorage.removeItem('userId');
//             router.push('/connexion');
//           }}
//         >
//           <Ionicons name="log-out-outline" size={18} color="#007AFF" />
//           <Text style={styles.secondaryText}>Déconnexion</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 80,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 16,
//     borderColor: '#007AFF',
//     borderWidth: 3,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#222',
//   },
//   role: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 30,
//   },
//   card: {
//     backgroundColor: '#F0F4F8',
//     width: '100%',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 15,
//     color: '#555',
//   },
//   value: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#222',
//   },
//   buttons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   primaryButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   primaryText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   secondaryButton: {
//     backgroundColor: '#EAF2FF',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   secondaryText: {
//     color: '#007AFF',
//     fontSize: 16,
//     marginLeft: 8,
//   },
// });
