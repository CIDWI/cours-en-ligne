// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity
// } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// export default function LessonScreen() {
//   const { chapterId, chapterTitle } = useLocalSearchParams<{ chapterId: string; chapterTitle: string }>();
//   const [lessons, setLessons] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();

//   const fetchLessons = async () => {
//     try {
//     //   const response = await fetch(`http://192.168.1.85:3000/chapter/${chapterId}`, {
//     const response = await fetch(`http://192.168.1.17:3000/chapter/${chapterId}`, {
        
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError('Non autorisé. Veuillez vous connecter.');
//           router.replace('/connexion');
//         } else {
//           setError(`Erreur HTTP ${response.status}`);
//         }
//         return;
//       }

//       const data = await response.json();
//       setLessons(data.lessons || []);
//       setError(null);
//     } catch (error) {
//       setError('Erreur lors du chargement des leçons.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLessons();
//   }, [chapterId, userToken]);

//   if (loading) {
//     return <View style={styles.loader}><ActivityIndicator size="large" /></View>;
//   }

//   if (error) {
//     return <View style={styles.loader}><Text style={{ color: 'red' }}>{error}</Text></View>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Leçons - {chapterTitle}</Text>
//       {lessons.length === 0 ? (
//         <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//       ) : (
//         lessons.map((lesson) => (
//           <TouchableOpacity
//             key={lesson.id}
//             style={styles.lessonItem}
//             onPress={() => router.push({
//               pathname: '/CourseScreen',
//               params: {
//                 lessonId: lesson.id,
//                 lessonTitle: lesson.title,
//                 level: lesson.level,
//                 languages: lesson.languages,
//                 link: lesson.link,
//               },
//             })}
//           >
//             <Text style={styles.lessonTitle}>{lesson.title}</Text>
//           </TouchableOpacity>
//         ))
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 32,
//     backgroundColor: '#f5f5f5',
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   lessonItem: {
//     marginBottom: 12,
//     backgroundColor: '#f0f8ff',
//     padding: 12,
//     borderRadius: 8,
//   },
//   lessonTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
// });

// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';
// import { Ionicons } from '@expo/vector-icons';

// export default function LessonScreen() {
//   const { chapterId, chapterTitle } = useLocalSearchParams<{
//     chapterId: string;
//     chapterTitle: string;
//   }>();
//   const [lessons, setLessons] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();

//   const fetchLessons = async () => {
//     if (!chapterId || !userToken) {
//       setError('Informations manquantes pour charger les leçons.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://192.168.1.17:3000/chapter/${chapterId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError('Non autorisé. Veuillez vous connecter.');
//           router.replace('/connexion');
//         } else {
//           setError(`Erreur HTTP ${response.status}`);
//         }
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();
//       setLessons(data.lessons || []);
//       setError(null);
//     } catch (err) {
//       setError('Erreur lors du chargement des leçons.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLessons();
//   }, [chapterId, userToken]);

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
//     <View style={styles.screen}>
//       <View style={styles.header}>
//        <TouchableOpacity
//   onPress={() => router.replace('/ChapitreScreen')}
//   style={styles.backButton}
//   activeOpacity={0.7}
// >
//   <Ionicons name="arrow-back" size={24} color="#6c5ce7" />
//   <Text style={styles.backText}>Retour</Text>
// </TouchableOpacity>

//         <Text style={styles.headerTitle}>Leçons - {chapterTitle}</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//         {lessons.length === 0 ? (
//           <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//         ) : (
//           lessons.map((lesson) => (
//             <TouchableOpacity
//               key={lesson.id}
//               style={styles.lessonItem}
//               onPress={() =>
//                 router.push({
//                   pathname: '/CourseScreen',
//                   params: {
//                     lessonId: lesson.id,
//                     lessonTitle: lesson.title,
//                     level: lesson.level,
//                     languages: lesson.languages,
//                     link: lesson.link,
//                   },
//                 })
//               }
//               activeOpacity={0.8}
//             >
//               <Ionicons name="play-circle-outline" size={22} color="#0984e3" style={{ marginRight: 12 }} />
//               <Text style={styles.lessonTitle}>{lesson.title}</Text>
//             </TouchableOpacity>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingTop: 48,
//     paddingBottom: 16,
//     backgroundColor: '#f0f4ff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     borderBottomColor: '#dfe6e9',
//     borderBottomWidth: 1,
    
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 12,
//     marginTop: 30, // <-- ajout pour descendre le bouton
  
//   },
//   backText: {
//     color: '#6c5ce7',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#2d3436',
//     flexShrink: 1,
//     marginTop: 30,
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   lessonItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e7f0ff',
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 14,
//     shadowColor: '#0984e3',
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 4,
//   },
//   lessonTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#0984e3',
//     flexShrink: 1,
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: '#636e72',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 40,
//   },
//   errorText: {
//     color: '#d63031',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });
// ----------------

// import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useContext, useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { AuthContext } from '../src/context/AuthContext';

// export default function LessonScreen() {
//   const { chapterId, chapterTitle } = useLocalSearchParams<{
//     chapterId?: string;
//     chapterTitle?: string;
//   }>();
//   const [lessons, setLessons] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     // Redirige vers la liste des chapitres si params manquants
//     if (!chapterId || !chapterTitle) {
//       setError('Informations manquantes pour charger les leçons.');
//       setLoading(false);
//       setTimeout(() => router.replace('/ChapitreScreen'), 2500);
//       return;
//     }

//     const fetchLessons = async () => {
//       if (!userToken) {
//         setError('Vous devez être connecté pour voir les leçons.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           // `http://192.168.1.17:3000/chapter/${chapterId}`,
//          `http://192.168.1.85:3000/chapter/${chapterId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//             router.replace('/connexion');
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//           }
//           setLoading(false);
//           return;
//         }

//         const data = await response.json();
//         setLessons(data.lessons || []);
//         setError(null);
//       } catch (err) {
//         setError('Erreur lors du chargement des leçons.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLessons();
//   }, [chapterId, chapterTitle, userToken]);

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
//     <View style={styles.screen}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => router.replace('/ChapitreScreen')}
//           style={styles.backButton}
//           activeOpacity={0.7}
//         >
//           <Ionicons name="arrow-back" size={24} color="#6c5ce7" />
//           <Text style={styles.backText}>Retour</Text>
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Leçons - {chapterTitle}</Text>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//       >
//         {lessons.length === 0 ? (
//           <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//         ) : (
//           lessons.map((lesson) => (
//             <TouchableOpacity
//               key={lesson.id}
//               style={styles.lessonItem}
//               onPress={() =>
//                 router.push({
//                   pathname: '/CourseScreen',
//                   params: {
//                     lessonId: lesson.id,
//                     lessonTitle: lesson.title,
//                     level: lesson.level,
//                     languages: lesson.languages,
//                     link: lesson.link,
//                     chapterId,
//                     chapterTitle,
//                   },
//                 })
//               }
//               activeOpacity={0.8}
//             >
//               <Ionicons
//                 name="play-circle-outline"
//                 size={22}
//                 color="#0984e3"
//                 style={{ marginRight: 12 }}
//               />
//               <Text style={styles.lessonTitle}>{lesson.title}</Text>
//             </TouchableOpacity>
//           ))
//         )}
//       </ScrollView>
//         {/* Bouton Home */}
//     <TouchableOpacity
//       onPress={() => router.replace('/accueil')}
//       style={styles.homeButton}
//       activeOpacity={0.7}
//     >
//       <Ionicons name="home-outline" size={24} color="#6c5ce7" />
//       <Text style={styles.homeText}>Accueil</Text>
//     </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingTop: 48,
//     paddingBottom: 16,
//     backgroundColor: '#f0f4ff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     borderBottomColor: '#dfe6e9',
//     borderBottomWidth: 1,
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 12,
//     marginTop: 30,
//   },
//   backText: {
//     color: '#6c5ce7',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#2d3436',
//     flexShrink: 1,
//     marginTop: 30,
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   lessonItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e7f0ff',
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 14,
//     shadowColor: '#0984e3',
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 4,
//   },
//   lessonTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#0984e3',
//     flexShrink: 1,
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: '#636e72',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 40,
//   },
//   errorText: {
//     color: '#d63031',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   homeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f0f4ff',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 24,
//     position: 'absolute',
//     bottom: 24,
//     alignSelf: 'center',
//     elevation: 3,
//     shadowColor: '#6c5ce7',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   homeText: {
//     color: '#6c5ce7',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
// });


// // ----------

// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   StyleSheet,
// } from 'react-native';
// import { AuthContext } from '../src/context/AuthContext'; // adapte le chemin selon ton projet
// import { decode as atob } from 'base-64'; // npm install base-64

// type Lesson = {
//   id: number;
//   title: string;
// };

// type Advancement = {
//   id: number;
//   lesson: Lesson;
//   isDone: boolean;
// };

// function parseJwt(token: string): { [key: string]: any } | null {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch {
//     return null;
//   }
// }

// export default function LessonScreen() {
//   const { userToken } = useContext(AuthContext);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [advancements, setAdvancements] = useState<Advancement[]>([]);
//   const [loading, setLoading] = useState(false);

//   // On décode le token pour récupérer l'id user
//   const userId = userToken ? parseJwt(userToken)?.id : null;

//   useEffect(() => {
//     if (!userToken) {
//       Alert.alert('Erreur', 'Vous devez être connecté.');
//       return;
//     }

//     async function fetchLessons() {
//       try {
//         const res = await fetch('http://192.168.1.85:3000/lesson', {
//           headers: { Authorization: `Bearer ${userToken}` },
//         });
//         if (!res.ok) throw new Error('Erreur chargement leçons');
//         const data = await res.json();
//         setLessons(data);
//       } catch (err) {
//         Alert.alert('Erreur', 'Impossible de charger les leçons.');
//       }
//     }

//     async function fetchAdvancements() {
//       if (!userId) return;
//       try {
//         const res = await fetch(`http://192.168.1.85:3000/advancement/user/${userId}`, {
//           headers: { Authorization: `Bearer ${userToken}` },
//         });
//         if (!res.ok) throw new Error('Erreur chargement progrès');
//         const data = await res.json();
//         setAdvancements(data);
//       } catch (err) {
//         Alert.alert('Erreur', 'Impossible de charger vos progrès.');
//       }
//     }

//     fetchLessons();
//     fetchAdvancements();
//   }, [userToken, userId]);

//   const startLesson = async (lesson: Lesson) => {
//     if (!userToken || !userId) {
//       Alert.alert('Erreur', 'Utilisateur non authentifié.');
//       return;
//     }

//     if (advancements.find(a => a.lesson.id === lesson.id)) {
//       Alert.alert('Info', 'Cette leçon est déjà commencée.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('http://192.168.1.85:3000/advancement', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId,
//           lessonId: lesson.id,
//           isDone: false,
//         }),
//       });
//       if (!res.ok) {
//         const error = await res.json();
//         Alert.alert('Erreur', error.error || 'Erreur inconnue');
//       } else {
//         const newAdvancement = await res.json();
//         setAdvancements(prev => [...prev, newAdvancement]);
//         Alert.alert('Succès', 'Leçon commencée !');
//       }
//     } catch {
//       Alert.alert('Erreur', 'Impossible de contacter le serveur.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!userToken) {
//     return (
//       <View style={styles.center}>
//         <Text>Vous devez être connecté pour accéder à cette page.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Liste des leçons</Text>
//       <FlatList
//         data={lessons}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.lessonItem} onPress={() => startLesson(item)} disabled={loading}>
//             <Text style={styles.lessonTitle}>{item.title}</Text>
//             <Text style={{ color: '#0984e3' }}>Commencer</Text>
//           </TouchableOpacity>
//         )}
//         ListEmptyComponent={<Text>Aucune leçon disponible</Text>}
//       />

//       <Text style={[styles.title, { marginTop: 20 }]}>Vos progrès</Text>
//       <FlatList
//         data={advancements}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.advancementItem}>
//             <Text>
//               {item.lesson.title} — {item.isDone ? 'Terminé' : 'En cours'}
//             </Text>
//           </View>
//         )}
//         ListEmptyComponent={<Text>Aucun progrès enregistré</Text>}
//       />

//       {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
//   lessonItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: '#ccc',
//     alignItems: 'center',
//   },
//   lessonTitle: { fontSize: 16 },
//   advancementItem: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#0a84ff',
//     borderRadius: 6,
//     marginBottom: 8,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../src/context/AuthContext';
import { decode as atob } from 'base-64';

type Lesson = {
  id: number;
  title: string;
  level?: string;
  languages?: string[];
  link?: string;
};

function parseJwt(token: string): { [key: string]: any } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function LessonScreen() {
  const { userToken } = useContext(AuthContext);
  const router = useRouter();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = userToken ? parseJwt(userToken)?.id : null;

  useEffect(() => {
    if (!userToken) {
      setError('Vous devez être connecté.');
      return;
    }

    async function fetchLessons() {
      try {
        const res = await fetch('http://192.168.1.85:3000/lesson', {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (!res.ok) throw new Error('Erreur chargement leçons');
        const data = await res.json();
        setLessons(data);
      } catch {
        setError('Impossible de charger les leçons.');
      }
    }

    fetchLessons();
  }, [userToken, userId]);

  const handleLessonPress = async (lesson: Lesson) => {
    if (!userToken || !userId) {
      Alert.alert('Erreur', 'Utilisateur non authentifié.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://192.168.1.85:3000/advancement', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          lessonId: lesson.id,
          isDone: false,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        Alert.alert('Erreur', error.error || 'Erreur inconnue');
      } else {
        Alert.alert('Succès', 'Leçon commencée !');
        router.push({
          pathname: '/CourseScreen',
          params: {
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            level: lesson.level,
            languages: lesson.languages,
            link: lesson.link,
          },
        });
      }
    } catch {
      Alert.alert('Erreur', 'Impossible de contacter le serveur.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (loading && lessons.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Bouton Accueil */}
      <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/accueil')}>
        <Ionicons name="home-outline" size={28} color="#2d3436" />
      </TouchableOpacity>

      <Text style={styles.title}>Liste des leçons</Text>

      <FlatList
        data={lessons}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.lessonItem}
            onPress={() => handleLessonPress(item)}
            disabled={loading}
          >
            <Ionicons
              name="play-circle-outline"
              size={24}
              color="#0984e3"
              style={{ marginRight: 12 }}
            />
            <Text style={styles.lessonTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noLesson}>Aucune leçon disponible</Text>}
      />

      {loading && lessons.length > 0 && (
        <ActivityIndicator style={{ marginTop: 10 }} size="small" color="#6c5ce7" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  homeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: '#2d3436' },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7f0ff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#0984e3',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  lessonTitle: { fontSize: 18, fontWeight: '600', color: '#0984e3', flexShrink: 1 },
  noLesson: {
    fontStyle: 'italic',
    color: '#636e72',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  errorText: {
    color: '#d63031',
    fontSize: 16,
    textAlign: 'center',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
