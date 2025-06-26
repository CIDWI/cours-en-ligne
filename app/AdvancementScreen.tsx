// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function AdvancementScreen() {
//   const [advancements, setAdvancements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAdvancements = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');

//         if (!token) {
//           setError('Token manquant. Veuillez vous reconnecter.');
//           setLoading(false);
//           return;
//         }

//         // const response = await fetch('http://localhost:3000/advancement', {
//         const response = await fetch('http://192.168.1.17:3000/advancement', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//           }
//           return;
//         }

//         const data = await response.json();
//         setAdvancements(data);
//         setError(null);
//       } catch (error) {
//         setError('Erreur lors du chargement des progrès.');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdvancements();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loader}>
//         <Text style={{ color: 'red', fontWeight: 'bold' }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Mes Progrès</Text>
//       {advancements.length === 0 && (
//         <Text style={styles.noAdvancement}>Aucun progrès trouvé.</Text>
//       )}
//       {advancements.map((advancement: any) => (
//         <View key={advancement.id} style={styles.card}>
//           <Text style={styles.lessonTitle}>{advancement.lesson.title}</Text>
//           <Text style={styles.status}>
//             Statut : {advancement.isDone ? 'Terminé ✅' : 'En cours ⏳'}
//           </Text>
//             <TouchableOpacity
//       onPress={() => router.replace('/accueil')}
//       style={styles.homeButton}
//       activeOpacity={0.7}
//     >
//       <Ionicons name="home-outline" size={24} color="#6c5ce7" />
//       <Text style={styles.homeText}>Accueil</Text>
//     </TouchableOpacity>
//         </View>
        
//       ))}
      
//     </ScrollView>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 32,
//     backgroundColor: '#f5f5f5',
//     marginTop: 30,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   lessonTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   status: {
//     marginTop: 8,
//     fontSize: 16,
//     color: '#555',
//   },
//   noAdvancement: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
//   homeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 12,
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//     alignSelf: 'flex-start',
//   },
//   homeText: {
//     marginLeft: 8,
//     color: '#6c5ce7',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function AdvancementScreen() {
//   const [advancements, setAdvancements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAdvancements = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');

//         if (!token) {
//           setError('Token manquant. Veuillez vous reconnecter.');
//           setLoading(false);
//           return;
//         }

//         const response = await fetch('http://192.168.1.17:3000/advancement', {
//               // const response = await fetch('http://192.168.1.85:3000/advancement', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//           }
//           return;
//         }

//         const data = await response.json();
//         setAdvancements(data);
//         setError(null);
//       } catch (error) {
//         setError('Erreur lors du chargement des progrès.');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdvancements();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#6c5ce7" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loader}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f9fbff' }}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => router.replace('/accueil')}
//           style={styles.homeButton}
//           activeOpacity={0.8}
//         >
//           <Ionicons name="home-outline" size={24} color="#fff" />
//           <Text style={styles.homeText}>Accueil</Text>
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Mes Progrès</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
//         {advancements.length === 0 ? (
//           <Text style={styles.noAdvancement}>Aucun progrès trouvé.</Text>
//         ) : (
//           advancements.map((advancement: any) => (
//             <View key={advancement.id} style={styles.card}>
//               <Text style={styles.lessonTitle}>{advancement.lesson.title}</Text>
//               <View style={styles.statusBox}>
//                 <Ionicons
//                   name={advancement.isDone ? 'checkmark-done-circle' : 'time-outline'}
//                   size={20}
//                   color={advancement.isDone ? '#2ecc71' : '#f39c12'}
//                   style={{ marginRight: 8 }}
//                 />
//                 <Text
//                   style={[
//                     styles.statusText,
//                     { color: advancement.isDone ? '#2ecc71' : '#f39c12' },
//                   ]}
//                 >
//                   {advancement.isDone ? 'Terminé' : 'En cours'}
//                 </Text>
//               </View>
//             </View>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#6c5ce7',
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   homeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#5e54d6',
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   homeText: {
//     color: '#fff',
//     marginLeft: 6,
//     fontWeight: '600',
//     fontSize: 15,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: '700',
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#6c5ce7',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   lessonTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#2d3436',
//     marginBottom: 8,
//   },
//   statusBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   noAdvancement: {
//     fontSize: 16,
//     color: '#636e72',
//     textAlign: 'center',
//     marginTop: 40,
//     fontStyle: 'italic',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f9fbff',
//     padding: 16,
//   },
//   errorText: {
//     color: '#d63031',
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  id: number;
  role: string;
  firstName?: string;
  lastName?: string;
};

export default function AdvancementScreen() {
  const [advancements, setAdvancements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvancements = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          setError('Token manquant. Veuillez vous reconnecter.');
          setLoading(false);
          return;
        }

        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.id;

      //  const response = await fetch(`http://192.168.1.17:3000/advancement/user/${userId}`, {
         const response = await fetch(`http://192.168.1.85:3000/advancement/user/${userId}`, {

          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('Non autorisé. Veuillez vous connecter.');
            setLoading(false);
            return;
          }

          if (response.status === 404) {
            // Aucun avancement trouvé
            setAdvancements([]);
            setError(null);
            setLoading(false);
            return;
          }

          setError(`Erreur HTTP ${response.status}`);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setAdvancements(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des progrès.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvancements();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fbff' }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/accueil')}
          style={styles.homeButton}
          activeOpacity={0.8}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.homeText}>Accueil</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Mes Progrès</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {advancements.length === 0 ? (
          <Text style={styles.noAdvancement}>Vous n'avez aucun avancement.</Text>
        ) : (
          advancements.map((advancement: any) => (
            <View key={advancement.id} style={styles.card}>
              <Text style={styles.lessonTitle}>{advancement.lesson.title}</Text>
              <View style={styles.statusBox}>
                <Ionicons
                  name={advancement.isDone ? 'checkmark-done-circle' : 'time-outline'}
                  size={20}
                  color={advancement.isDone ? '#2ecc71' : '#f39c12'}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: advancement.isDone ? '#2ecc71' : '#f39c12' },
                  ]}
                >
                  {advancement.isDone ? 'Terminé' : 'En cours'}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6c5ce7',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5e54d6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 12,
  },
  homeText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 8,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  noAdvancement: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fbff',
    padding: 16,
  },
  errorText: {
    color: '#d63031',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
