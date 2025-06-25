// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Linking,
//   Alert,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import AuthContext from './deconnexion';

// export default function ChapitreScreen() {
//   const { userToken, logout } = useContext(AuthContext);
//   const router = useRouter();

//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userToken) {
//       router.replace('/connexion');
//       return;
//     }

//     let isMounted = true;

//     const fetchChapters = async () => {
//       try {
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             if (isMounted) {
//               Alert.alert('Session expirée', 'Merci de vous reconnecter.');
//               setError('Session expirée');
//             }
//             await logout();
//             router.replace('/connexion');
//             return;
//           } else {
//             throw new Error(`Erreur HTTP ${response.status}`);
//           }
//         }

//         const data = await response.json();
//         if (isMounted) {
//           setChapters(data);
//         }
//       } catch (err) {
//         if (isMounted) {
//           console.error('Erreur fetch chapters :', err);
//           setError('Erreur lors du chargement des chapitres.');
//         }
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchChapters();
//     return () => {
//       isMounted = false;
//     };
//   }, [userToken]);

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
//         <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chapitres & Leçons</Text>

//       {chapters.length === 0 ? (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       ) : (
//         chapters.map((chapter: any) => (
//           <View key={chapter.id} style={styles.chapterCard}>
//             <Text style={styles.chapterTitle}>{chapter.title}</Text>
//             {chapter.lessons && chapter.lessons.length > 0 ? (
//               chapter.lessons.map((lesson: any) => (
//                 <View key={lesson.id} style={styles.lessonItem}>
//                   <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                   <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                   <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                   <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                     <Text style={styles.link}>Voir la vidéo</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//             )}
//           </View>
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
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
// });















// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';
// // Définition locale du type AuthContextType
// type AuthContextType = {
//   userToken: string | null;
//   logout: () => Promise<void> | void;
// };

// interface Lesson {
//   id: number;
//   title: string;
//   level: string;
//   languages: string;
//   link: string;
// }

// interface Chapter {
//   id: number;
//   title: string;
//   lessons: Lesson[];
// }

// export default function ChapitreScreen() {
//   const { userToken, logout } = useContext(AuthContext) as AuthContextType; // ✅ correctement utilisé
//   const router = useRouter();

//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userToken) {
//       router.replace('/connexion');
//       return;
//     }

//     let isMounted = true;

//     const fetchChapters = async () => {
//       try {
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             if (isMounted) {
//               Alert.alert('Session expirée', 'Merci de vous reconnecter.');
//               setError('Session expirée');
//               await logout();
//               router.replace('/connexion');
//             }
//             return;
//           } else {
//             throw new Error(`Erreur HTTP ${response.status}`);
//           }
//         }

//         const data = await response.json();
//         if (isMounted) {
//           setChapters(data);
//         }
//       } catch (err) {
//         if (isMounted) {
//           console.error('Erreur fetch chapters :', err);
//           setError('Erreur lors du chargement des chapitres.');
//         }
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchChapters();

//     return () => {
//       isMounted = false;
//     };
//   }, [userToken]);

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
//         <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chapitres & Leçons</Text>

//       {chapters.length === 0 ? (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       ) : (
//         chapters.map((chapter) => (
//           <View key={chapter.id} style={styles.chapterCard}>
//             <Text style={styles.chapterTitle}>{chapter.title}</Text>
//             {chapter.lessons && chapter.lessons.length > 0 ? (
//               chapter.lessons.map((lesson) => (
//                 <View key={lesson.id} style={styles.lessonItem}>
//                   <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                   <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                   <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                   <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                     <Text style={styles.link}>Voir la vidéo</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//             )}
//           </View>
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
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
// });




// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
// import { useRouter, useSegments } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// type AuthContextType = {
//   userToken: string | null;
//   logout: () => Promise<void> | void;
//   loading: boolean;
// };

// interface Lesson {
//   id: number;
//   title: string;
//   level: string;
//   languages: string;
//   link: string;
// }

// interface Chapter {
//   id: number;
//   title: string;
//   lessons: Lesson[];
// }

// export default function ChapitreScreen() {
//   const { userToken, logout, loading } = useContext(AuthContext) as AuthContextType;
//   const router = useRouter();
//   const segments = useSegments();

//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Redirection si user non connecté MAIS uniquement si on n'est pas déjà sur /connexion
//   useEffect(() => {
//     if (!loading && !userToken && segments[segments.length - 1] !== 'connexion') {
//       router.replace('/connexion');
//     }
//   }, [loading, userToken, router, segments]);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchChapters = async () => {
//       if (!userToken) return;

//       setDataLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             if (isMounted) {
//               Alert.alert('Session expirée', 'Merci de vous reconnecter.');
//               await logout();
//               router.replace('/connexion');
//             }
//             return;
//           } else {
//             throw new Error(`Erreur HTTP ${response.status}`);
//           }
//         }

//         const data = await response.json();
//         if (isMounted) {
//           setChapters(data);
//         }
//       } catch (err) {
//         if (isMounted) {
//           console.error('Erreur fetch chapters :', err);
//           setError('Erreur lors du chargement des chapitres.');
//         }
//       } finally {
//         if (isMounted) setDataLoading(false);
//       }
//     };

//     fetchChapters();

//     return () => {
//       isMounted = false;
//     };
//   }, [userToken, logout, router]);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text>Chargement de l'utilisateur...</Text>
//       </View>
//     );
//   }

//   if (dataLoading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text>Chargement des chapitres...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loader}>
//         <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chapitres & Leçons</Text>

//       {chapters.length === 0 ? (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       ) : (
//         chapters.map((chapter) => (
//           <View key={chapter.id} style={styles.chapterCard}>
//             <Text style={styles.chapterTitle}>{chapter.title}</Text>
//             {chapter.lessons && chapter.lessons.length > 0 ? (
//               chapter.lessons.map((lesson) => (
//                 <View key={lesson.id} style={styles.lessonItem}>
//                   <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                   <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                   <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                   <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                     <Text style={styles.link}>Voir la vidéo</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//             )}
//           </View>
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
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
// });


// --------------------------------

// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Linking,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// type AuthContextType = {
//   userToken: string | null;
//   logout: () => Promise<void> | void;
//   loading: boolean;
// };

// interface Lesson {
//   id: number;
//   title: string;
//   level: string;
//   languages: string;
//   link: string;
// }

// interface Chapter {
//   id: number;
//   title: string;
//   lessons: Lesson[];
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
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
// });

// export default function ChapitreScreen() {
//   const { userToken, logout, loading } = useContext(AuthContext) as AuthContextType;
//   const navigation = useNavigation();
//   const router = useRouter();

//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!loading && !userToken) {
//       console.log('Redirection vers Connexion');
//       router.push('/connexion');
//     }
//   }, [loading, userToken, router]);


//   useEffect(() => {
//     let isMounted = true;

//     const fetchChapters = async () => {
//       if (!userToken) return;

//       setDataLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             if (isMounted) {
//               Alert.alert('Session expirée', 'Merci de vous reconnecter.');
//               await logout();
//               router.push('/connexion');
//             }
//             return;
//           } else {
//             throw new Error(`Erreur HTTP ${response.status}`);
//           }
//         }

//         const data = await response.json();
//         if (isMounted) {
//           setChapters(data);
//         }
//       } catch (err) {
//         if (isMounted) {
//           console.error('Erreur fetch chapters :', err);
//           setError('Erreur lors du chargement des chapitres.');
//         }
//       } finally {
//         if (isMounted) setDataLoading(false);
//       }
//     };

//     fetchChapters();

//     return () => {
//       isMounted = false;
//     };
//   }, [userToken]);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text>Chargement </Text>
//       </View>
//     );
//   }

//   if (dataLoading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text>Chargement des chapitres...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loader}>
//         <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chapitres & Leçons</Text>

//       {chapters.length === 0 ? (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       ) : (
//         chapters.map((chapter) => (
//           <View key={chapter.id} style={styles.chapterCard}>
//             <Text style={styles.chapterTitle}>{chapter.title}</Text>
//             {chapter.lessons && chapter.lessons.length > 0 ? (
//               chapter.lessons.map((lesson) => (
//                 <View key={lesson.id} style={styles.lessonItem}>
//                   <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                   <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                   <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                   <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                     <Text style={styles.link}>Voir la vidéo</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//             )}
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// }













// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Linking,
//   Alert,
//   Button,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from './AuthContext'; // ajuste le chemin si besoin

// export default function ChapitreScreen() {
//   const authContext = useContext(AuthContext);
//   if (!authContext) {
//     throw new Error("AuthContext must be used within an AuthProvider");
//   }
//   const { userToken, logout } = authContext;

//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     if (!userToken) {
//       router.replace('/connexion');
//       return;
//     }

//     let isMounted = true; // pour éviter les effets après démontage
//     const fetchChapters = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             if (isMounted) {
//               setError('Non autorisé. Veuillez vous reconnecter.');
//               Alert.alert('Session expirée', 'Merci de vous reconnecter.');
//             }
//             await logout();
//             router.replace('/connexion');
//             return;
//           } else {
//             if (isMounted) {
//               setError(`Erreur HTTP ${response.status}`);
//               setChapters([]);
//             }
//             return;
//           }
//         }

//         const data = await response.json();
//         if (isMounted) {
//           setChapters(data);
//           setError(null);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError('Erreur lors du chargement des chapitres.');
//           setChapters([]);
//         }
//         console.error('Fetch chapters error:', err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchChapters();

//     return () => {
//       isMounted = false;
//     };
//   }, [userToken, logout, router]);

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
//         <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>
//           {error}
//         </Text>
//         <Button title="Se déconnecter" onPress={logout} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={{ marginBottom: 16, alignItems: 'flex-end' }}>
//         <Button title="Déconnexion" onPress={logout} />
//       </View>

//       <Text style={styles.title}>Chapitres & Leçons</Text>

//       {chapters.length === 0 ? (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       ) : (
//         chapters.map((chapter: any) => (
//           <View key={chapter.id} style={styles.chapterCard}>
//             <Text style={styles.chapterTitle}>{chapter.title}</Text>
//             {chapter.lessons && chapter.lessons.length > 0 ? (
//               chapter.lessons.map((lesson: any) => (
//                 <View key={lesson.id} style={styles.lessonItem}>
//                   <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                   <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                   <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                   <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                     <Text style={styles.link}>Voir la vidéo</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//             )}
//           </View>
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
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
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
//   Linking,
//   Alert,
//   Button,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from './AuthContext'; // ajuste le chemin selon ta structure

// export default function ChapitreScreen() {
//  // const { userToken, logout } = useContext(AuthContext);

//  const authContext = useContext(AuthContext);
// if (!authContext) {
//   throw new Error("AuthContext must be used within an AuthProvider");
// }
// const { userToken, logout } = authContext;

//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     if (!userToken) {
//       router.replace('/connexion'); // redirection immédiate si pas connecté
//       return;
//     }

//     const fetchChapters = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//             Alert.alert('Session expirée', 'Merci de vous reconnecter.');
//             await logout();
//             router.replace('/connexion');
//             setLoading(false);
//             return;
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//             setChapters([]);
//             setLoading(false);
//             return;
//           }
//         }

//         const data = await response.json();
//         setChapters(data);
//         setError(null);
//       } catch (error) {
//         setError('Erreur lors du chargement des chapitres.');
//         console.error('Fetch chapters error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChapters();
//   }, [userToken]);

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
//         <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>
//           {error}
//         </Text>
//         <Button title="Se déconnecter" onPress={logout} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={{ marginBottom: 16, alignItems: 'flex-end' }}>
//         <Button title="Déconnexion" onPress={logout} />
//       </View>

//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 && (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       )}
//       {chapters.map((chapter: any) => (
//         <View key={chapter.id} style={styles.chapterCard}>
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//           {chapter.lessons && chapter.lessons.length > 0 ? (
//             chapter.lessons.map((lesson: any) => (
//               <View key={lesson.id} style={styles.lessonItem}>
//                 <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                 <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                 <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                 <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                   <Text style={styles.link}>Voir la vidéo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//           )}
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
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
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
//   Linking,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   const fetchChapters = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       console.log('Token récupéré dans ChapitreScreen:', token);

//       if (!token) {
//         setError('Token manquant. Veuillez vous reconnecter.');
//         setLoading(false);
//         await AsyncStorage.removeItem('userToken');
//         router.replace('/connexion');  // redirige immédiatement vers connexion
//         return;
//       }

//       const response = await fetch('http://192.168.1.85:3000/chapter', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError('Non autorisé. Veuillez vous connecter.');
//           await AsyncStorage.removeItem('userToken');
//           Alert.alert('Session expirée', 'Merci de vous reconnecter.');
//           router.replace('/connexion');  // redirection automatique
//           setLoading(false);
//           return;
//         } else {
//           setError(`Erreur HTTP ${response.status}`);
//           setChapters([]);
//           setLoading(false);
//           return;
//         }
//       }

//       const data = await response.json();
//       console.log('Chapitres reçus:', data);
//       setChapters(data);
//       setError(null);
//     } catch (error) {
//       setError('Erreur lors du chargement des chapitres.');
//       console.error('Fetch chapters error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChapters();
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
//         <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>
//           {error}
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 && (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       )}
//       {chapters.map((chapter: any) => (
//         <View key={chapter.id} style={styles.chapterCard}>
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//           {chapter.lessons && chapter.lessons.length > 0 ? (
//             chapter.lessons.map((lesson: any) => (
//               <View key={lesson.id} style={styles.lessonItem}>
//                 <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                 <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                 <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                 <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                   <Text style={styles.link}>Voir la vidéo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//           )}
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
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
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
//   Linking,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchChapters = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       console.log('Token récupéré dans ChapitreScreen:', token);

//       if (!token) {
//         setError('Token manquant. Veuillez vous reconnecter.');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch('http://192.168.1.85:3000/chapter', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError('Non autorisé. Veuillez vous connecter.');
//           // Optionnel : clear token
//           await AsyncStorage.removeItem('userToken');
//           Alert.alert('Session expirée', 'Merci de vous reconnecter.');
//         } else {
//           setError(`Erreur HTTP ${response.status}`);
//         }
//         setChapters([]);
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();
//       console.log('Chapitres reçus:', data);
//       setChapters(data);
//       setError(null);
//     } catch (error) {
//       setError('Erreur lors du chargement des chapitres.');
//       console.error('Fetch chapters error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChapters();
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
//         <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>
//           {error}
//         </Text>
//         <TouchableOpacity style={styles.reloadButton} onPress={fetchChapters}>
//           <Text style={styles.reloadButtonText}>Réessayer</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 && (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       )}
//       {chapters.map((chapter: any) => (
//         <View key={chapter.id} style={styles.chapterCard}>
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//           {chapter.lessons && chapter.lessons.length > 0 ? (
//             chapter.lessons.map((lesson: any) => (
//               <View key={lesson.id} style={styles.lessonItem}>
//                 <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                 <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                 <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                 <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                   <Text style={styles.link}>Voir la vidéo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//           )}
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
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   reloadButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   reloadButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
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
//   Linking,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');

//         if (!token) {
//           setError('Token manquant. Veuillez vous reconnecter.');
//           setLoading(false);
//           return;
//         }

//         // const response = await fetch('http://localhost:3000/chapter', {
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//           }
//           setChapters([]);
//           return;
//         }

//         const data = await response.json();
//         setChapters(data);
//         setError(null);
//       } catch (error) {
//         setError('Erreur lors du chargement des chapitres.');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChapters();
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
//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 && (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       )}
//       {chapters.map((chapter: any) => (
//         <View key={chapter.id} style={styles.chapterCard}>
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//           {chapter.lessons && chapter.lessons.length > 0 ? (
//             chapter.lessons.map((lesson: any) => (
//               <View key={lesson.id} style={styles.lessonItem}>
//                 <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                 <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                 <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                 <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                   <Text style={styles.link}>Voir la vidéo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//           )}
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
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
// });




// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Linking,
//   AppState,
//   AppStateStatus,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const appState = useRef<AppStateStatus>(AppState.currentState);

//   const fetchChapters = async () => {
//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem('userToken');

//       if (!token) {
//         setError('Token manquant. Veuillez vous reconnecter.');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch('http://192.168.1.85:3000/chapter', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError('Non autorisé. Veuillez vous connecter.');
//         } else {
//           setError(`Erreur HTTP ${response.status}`);
//         }
//         setChapters([]);
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();
//       setChapters(data);
//       setError(null);
//     } catch (error) {
//       setError('Erreur lors du chargement des chapitres.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChapters();

//     const subscription = AppState.addEventListener('change', (nextAppState) => {
//       if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//         // L'app revient au premier plan, on recharge les données
//         fetchChapters();
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscription.remove();
//     };
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
//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 && <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>}
//       {chapters.map((chapter: any) => (
//         <View key={chapter.id} style={styles.chapterCard}>
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//           {chapter.lessons && chapter.lessons.length > 0 ? (
//             chapter.lessons.map((lesson: any) => (
//               <View key={lesson.id} style={styles.lessonItem}>
//                 <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                 <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                 <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                 <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                   <Text style={styles.link}>Voir la vidéo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//           )}
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
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
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
//   Linking,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       try {
//         // Récupérer le token stocké
//         const token = await AsyncStorage.getItem('userToken');
//         console.log('Token récupéré dans ChapitreScreen:', token);

//         if (!token) {
//           setError('Token manquant. Veuillez vous reconnecter.');
//           setLoading(false);
//           return;
//         }

//         // Appel API avec token dans header Authorization
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//           }
//           setChapters([]);
//           setLoading(false);
//           return;
//         }

//         const data = await response.json();
//         setChapters(data);
//         setError(null);
//       } catch (err) {
//         setError('Erreur lors du chargement des chapitres.');
//         console.error('Erreur fetchChapters:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChapters();
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
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 ? (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       ) : (
//         chapters.map((chapter) => (
//           <View key={chapter.id} style={styles.chapterCard}>
//             <Text style={styles.chapterTitle}>{chapter.title}</Text>
//             {chapter.lessons && chapter.lessons.length > 0 ? (
//               chapter.lessons.map((lesson) => (
//                 <View key={lesson.id} style={styles.lessonItem}>
//                   <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                   <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                   <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                   <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                     <Text style={styles.link}>Voir la vidéo</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//             )}
//           </View>
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
//     padding: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
//   errorText: {
//     color: 'red',
//     fontWeight: 'bold',
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
//   Linking,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');

//         if (!token) {
//           setError('Token manquant. Veuillez vous reconnecter.');
//           setLoading(false);
//           return;
//         }

//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//           }
//           setChapters([]);
//           return;
//         }

//         const data = await response.json();
//         setChapters(data);
//         setError(null);
//       } catch (error) {
//         console.error(error);
//         setError('Erreur lors du chargement des chapitres.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChapters();
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
//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 && (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       )}
//       {chapters.map((chapter: any) => (
//         <View key={chapter.id} style={styles.chapterCard}>
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//           {chapter.lessons && chapter.lessons.length > 0 ? (
//             chapter.lessons.map((lesson: any) => (
//               <View key={lesson.id} style={styles.lessonItem}>
//                 <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                 <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                 <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                 <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                   <Text style={styles.link}>Voir la vidéo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//           )}
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
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
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
//   Linking,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router'; // ou useNavigation si tu utilises react-navigation
// import { AuthContext } from '../../src/contexts/AuthContext'; // ajuste le chemin si besoin

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     // if (!userToken) {
//     //   router.replace('/connexion'); // Redirection si déconnecté
//     //   return;
//     // }

//     const fetchChapters = async () => {
//       try {
//         const response = await fetch('http://192.168.1.85:3000/chapter', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${userToken}`,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//             router.replace('/connexion');
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//           }
//           setChapters([]);
//           return;
//         }

//         const data = await response.json();
//         setChapters(data);
//         setError(null);
//       } catch (error) {
//         console.error(error);
//         setError('Erreur lors du chargement des chapitres.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChapters();
//   }, [userToken]);

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
//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 && (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       )}
//       {chapters.map((chapter: any) => (
//         <View key={chapter.id} style={styles.chapterCard}>
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//           {chapter.lessons && chapter.lessons.length > 0 ? (
//             chapter.lessons.map((lesson: any) => (
//               <View key={lesson.id} style={styles.lessonItem}>
//                 <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                 <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                 <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                 <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                   <Text style={styles.link}>Voir la vidéo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//           )}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   // (styles identiques à avant)
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
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
// });
// import React, { useState, useContext, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Linking,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();

//   const fetchChapters = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://192.168.1.85:3000/chapter', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError('Non autorisé. Veuillez vous connecter.');
//           router.replace('/connexion');
//         } else {
//           setError(`Erreur HTTP ${response.status}`);
//         }
//         setChapters([]);
//         return;
//       }

//       const data = await response.json();
//       setChapters(data);
//       setError(null);
//     } catch (error) {
//       console.error(error);
//       setError('Erreur lors du chargement des chapitres.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Rafraîchir automatiquement à chaque retour sur l’écran
//   useFocusEffect(
//     useCallback(() => {
//       fetchChapters();
//     }, [userToken])
//   );

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
//       <Text style={styles.title}>Chapitres & Leçons</Text>
//       {chapters.length === 0 && (
//         <Text style={styles.noLesson}>Aucun chapitre trouvé.</Text>
//       )}
//       {chapters.map((chapter: any) => (
//         <View key={chapter.id} style={styles.chapterCard}>
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//           {chapter.lessons && chapter.lessons.length > 0 ? (
//             chapter.lessons.map((lesson: any) => (
//               <View key={lesson.id} style={styles.lessonItem}>
//                 <Text style={styles.lessonTitle}>{lesson.title}</Text>
//                 <Text style={styles.lessonDetail}>Niveau : {lesson.level}</Text>
//                 <Text style={styles.lessonDetail}>Langage : {lesson.languages}</Text>
//                 <TouchableOpacity onPress={() => Linking.openURL(lesson.link)}>
//                   <Text style={styles.link}>Voir la vidéo</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
//           )}
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
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
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
//   lessonDetail: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#007bff',
//     marginTop: 6,
//     fontWeight: 'bold',
//   },
//   noLesson: {
//     fontStyle: 'italic',
//     color: 'gray',
//   },
// });

// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();

//   const fetchChapters = async () => {
//     try {
//       const response = await fetch('http://192.168.1.85:3000/chapter', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
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
//       setChapters(data);
//       setError(null);
//     } catch (error) {
//       setError('Erreur lors du chargement des chapitres.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChapters();
//   }, [userToken]);

//   if (loading) {
//     return <View style={styles.loader}><ActivityIndicator size="large" /></View>;
//   }

//   if (error) {
//     return <View style={styles.loader}><Text style={{ color: 'red' }}>{error}</Text></View>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Chapitres</Text>
//       {chapters.map((chapter: any) => (
//         <TouchableOpacity
//           key={chapter.id}
//           style={styles.chapterCard}
//           onPress={() => router.push({ pathname: '/LessonScreen', params: { chapterId: chapter.id, chapterTitle: chapter.title } })}
//         >
//           <Text style={styles.chapterTitle}>{chapter.title}</Text>
//         </TouchableOpacity>
//       ))}
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
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });






// -------------------




// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';
// import { Ionicons } from '@expo/vector-icons';

// export default function ChapitreScreen() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (userToken) {
//       fetchCourses();
//     } else {
//       setError("Token utilisateur introuvable.");
//       setLoading(false);
//     }
//   }, [userToken]);

//   const fetchCourses = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('http://192.168.1.17:3000/course', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || 'Erreur lors du chargement des cours');
//       }

//       const data = await response.json();
//       setCourses(data);
//     } catch (err: any) {
//       console.error('Erreur fetchCourses:', err.message);
//       setError(err.message || 'Erreur inconnue');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchChapters = async (courseId: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`http://192.168.1.17:3000/chapter?courseId=${courseId}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || 'Erreur lors du chargement des chapitres');
//       }

//       const data = await response.json();
//       setChapters(data);
//     } catch (err: any) {
//       console.error('Erreur fetchChapters:', err.message);
//       setError(err.message || 'Erreur inconnue');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectCourse = (courseId: string) => {
//     setSelectedCourseId(courseId);
//     fetchChapters(courseId);
//   };

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
//         <Text style={styles.error}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />

//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.title}>
//           {selectedCourseId ? 'Chapitres' : 'Cours'}
//         </Text>

//         {selectedCourseId === null ? (
//           courses.map((course) => (
//             <TouchableOpacity
//               key={course.id}
//               style={styles.card}
//               onPress={() => handleSelectCourse(course.id)}
//               activeOpacity={0.9}
//             >
//               <Ionicons name="book-outline" size={22} color="#6c5ce7" />
//               <Text style={styles.cardText}>{course.title}</Text>
//             </TouchableOpacity>
//           ))
//         ) : (
//           <>
//             <TouchableOpacity
//               onPress={() => setSelectedCourseId(null)}
//               style={styles.backButton}
//             >
//               <Ionicons name="arrow-back-outline" size={20} color="#6c5ce7" />
//               <Text style={styles.backText}>Retour</Text>
//             </TouchableOpacity>

//             {chapters.map((chapter) => (
//               <TouchableOpacity
//                 key={chapter.id}
//                 style={styles.card}
//                 onPress={() =>
//                   router.push({
//                     pathname: '/LessonScreen',
//                     params: {
//                       chapterId: chapter.id,
//                       chapterTitle: chapter.title,
//                     },
//                   })
//                 }
//                 activeOpacity={0.9}
//               >
//                 <Ionicons name="document-text-outline" size={22} color="#6c5ce7" />
//                 <Text style={styles.cardText}>{chapter.title}</Text>
//               </TouchableOpacity>
//             ))}
//           </>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fdfdfd',
//   },
//   content: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fdfdfd',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#2d3436',
//     alignSelf: 'center',
//     marginBottom: 24,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     padding: 16,
//     borderRadius: 14,
//     marginBottom: 14,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     borderLeftWidth: 5,
//     borderLeftColor: '#6c5ce7',
//     gap: 12,
//   },
//   cardText: {
//     fontSize: 17,
//     color: '#2d3436',
//     fontWeight: '500',
//     flexShrink: 1,
//   },
//   backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   backText: {
//     marginLeft: 6,
//     fontSize: 16,
//     color: '#6c5ce7',
//     fontWeight: '500',
//   },
//   error: {
//     color: '#d63031',
//     fontSize: 16,
//     textAlign: 'center',
//     padding: 16,
//   },
// });



// ------------------

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../src/context/AuthContext';

export default function ChapitreScreen() {
  const [courses, setCourses] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userToken } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (userToken) {
      fetchCourses();
    } else {
      setError("Token utilisateur introuvable.");
      setLoading(false);
    }
  }, [userToken]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      // const response = await fetch('http://192.168.1.17:3000/course', {
        const response = await fetch('http://192.168.1.85:3000/course', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors du chargement des cours');
      }

      const data = await response.json();
      setCourses(data);
    } catch (err: any) {
      console.error('Erreur fetchCourses:', err.message);
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const fetchChapters = async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      // const response = await fetch(`http://192.168.1.17:3000/chapter?courseId=${courseId}`, {
        const response = await fetch(`http://192.168.1.85:3000/chapter?courseId=${courseId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors du chargement des chapitres');
      }

      const data = await response.json();
      setChapters(data);
    } catch (err: any) {
      console.error('Erreur fetchChapters:', err.message);
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    fetchChapters(courseId);
  };

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
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{selectedCourseId ? 'Chapitres' : 'Cours'}</Text>

        {selectedCourseId === null ? (
          courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.card}
              onPress={() => handleSelectCourse(course.id)}
              activeOpacity={0.9}
            >
              <Ionicons name="book-outline" size={22} color="#6c5ce7" />
              <Text style={styles.cardText}>{course.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <>
          <TouchableOpacity
  onPress={() => {
    setSelectedCourseId(null);
    router.replace('/ChapitreScreen');
  }}
  style={styles.backButton}
>
  <Ionicons name="arrow-back-outline" size={20} color="#6c5ce7" />
  <Text style={styles.backText}>Retour</Text>
</TouchableOpacity>


            {chapters.map((chapter) => (
              <TouchableOpacity
                key={chapter.id}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: '/LessonScreen',
                    params: {
                      chapterId: chapter.id,
                      chapterTitle: chapter.title,
                    },
                  })
                }
                activeOpacity={0.9}
              >
                <Ionicons name="document-text-outline" size={22} color="#6c5ce7" />
                <Text style={styles.cardText}>{chapter.title}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
        {/* Bouton Home */}
    <TouchableOpacity
      onPress={() => router.replace('/accueil')}
      style={styles.homeButton}
      activeOpacity={0.7}
    >
      <Ionicons name="home-outline" size={24} color="#6c5ce7" />
      <Text style={styles.homeText}>Accueil</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d3436',
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 40, // <-- ici le titre est plus bas
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderLeftWidth: 5,
    borderLeftColor: '#6c5ce7',
    gap: 12,
  },
  cardText: {
    fontSize: 17,
    color: '#2d3436',
    fontWeight: '500',
    flexShrink: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#6c5ce7',
    fontWeight: '500',
  },
  error: {
    color: '#d63031',
    fontSize: 16,
    textAlign: 'center',
    padding: 16,
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






// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// export default function ChapitreScreen() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();

//   // Récupération des cours
//   const fetchCourses = async () => {
//     try {
//       const response = await fetch('http://192.168.1.17:3000/course', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) throw new Error('Erreur lors du chargement des cours');

//       const data = await response.json();
//       setCourses(data);
//     } catch (err) {
//       setError('Erreur lors du chargement des cours.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Récupération des chapitres selon le cours sélectionné
//   const fetchChapters = async (courseId: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://192.168.1.17:3000/chapter?courseId=${courseId}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) throw new Error('Erreur lors du chargement des chapitres');

//       const data = await response.json();
//       setChapters(data);
//     } catch (err) {
//       setError('Erreur lors du chargement des chapitres.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, [userToken]);

//   // Quand un cours est sélectionné
//   const handleSelectCourse = (courseId: string) => {
//     setSelectedCourseId(courseId);
//     fetchChapters(courseId);
//   };

//   if (loading) {
//     return <View style={styles.loader}><ActivityIndicator size="large" /></View>;
//   }

//   if (error) {
//     return <View style={styles.loader}><Text style={{ color: 'red' }}>{error}</Text></View>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Cours</Text>

//       {selectedCourseId === null ? (
//         courses.map((course: any) => (
//           <TouchableOpacity
//             key={course.id}
//             style={styles.chapterCard}
//             onPress={() => handleSelectCourse(course.id)}
//           >
//             <Text style={styles.chapterTitle}>{course.title}</Text>
//           </TouchableOpacity>
//         ))
//       ) : (
//         <>
//           <TouchableOpacity onPress={() => setSelectedCourseId(null)} style={{ marginBottom: 20 }}>
//             <Text style={{ color: 'blue' }}>← Retour aux cours</Text>
//           </TouchableOpacity>

//           <Text style={styles.title}>Chapitres</Text>
//           {chapters.map((chapter: any) => (
//             <TouchableOpacity
//               key={chapter.id}
//               style={styles.chapterCard}
//               onPress={() =>
//                 router.push({
//                   pathname: '/LessonScreen',
//                   params: {
//                     chapterId: chapter.id,
//                     chapterTitle: chapter.title,
//                   },
//                 })
//               }
//             >
//               <Text style={styles.chapterTitle}>{chapter.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </>
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
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   chapterCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     elevation: 3,
//   },
//   chapterTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });
