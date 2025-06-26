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

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AuthContext } from '../src/context/AuthContext';

export default function LessonScreen() {
  const { chapterId, chapterTitle } = useLocalSearchParams<{
    chapterId?: string;
    chapterTitle?: string;
  }>();
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userToken } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Redirige vers la liste des chapitres si params manquants
    if (!chapterId || !chapterTitle) {
      setError('Informations manquantes pour charger les leçons.');
      setLoading(false);
      setTimeout(() => router.replace('/ChapitreScreen'), 2500);
      return;
    }

    const fetchLessons = async () => {
      if (!userToken) {
        setError('Vous devez être connecté pour voir les leçons.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          // `http://192.168.1.17:3000/chapter/${chapterId}`,
         `http://192.168.1.85:3000/chapter/${chapterId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            setError('Non autorisé. Veuillez vous connecter.');
            router.replace('/connexion');
          } else {
            setError(`Erreur HTTP ${response.status}`);
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setLessons(data.lessons || []);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des leçons.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [chapterId, chapterTitle, userToken]);

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
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/ChapitreScreen')}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#6c5ce7" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Leçons - {chapterTitle}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {lessons.length === 0 ? (
          <Text style={styles.noLesson}>Aucune leçon disponible.</Text>
        ) : (
          lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonItem}
              onPress={() =>
                router.push({
                  pathname: '/CourseScreen',
                  params: {
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    level: lesson.level,
                    languages: lesson.languages,
                    link: lesson.link,
                    chapterId,
                    chapterTitle,
                  },
                })
              }
              activeOpacity={0.8}
            >
              <Ionicons
                name="play-circle-outline"
                size={22}
                color="#0984e3"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
            </TouchableOpacity>
          ))
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
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#f0f4ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomColor: '#dfe6e9',
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 30,
  },
  backText: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
    flexShrink: 1,
    marginTop: 30,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
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
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0984e3',
    flexShrink: 1,
  },
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
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#6c5ce7',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  homeText: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
