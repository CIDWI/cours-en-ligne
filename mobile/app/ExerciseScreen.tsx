
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
//   Linking,
// } from 'react-native';

// interface Exercise {
//   id: number;
//   title: string;
//   imageLink: string;
//   content: string;
// }

// export default function ExerciseScreen() {
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTA0MjQ2MDl9.AQbTWeGofwH8szM6cXeVf0EfgSuN2sx-93y3uuXhbdk'; // Remplace par ton token JWT valide


//         // const response = await fetch('http://localhost:3000/exercise', {
//         const response = await fetch('http://192.168.1.17:3000/exercise', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             setError('Non autorisé. Veuillez vous connecter.');
//           } else {
//             setError(`Erreur HTTP ${response.status}`);
//           }
//           setExercises([]);
//           return;
//         }

//         const data = await response.json();
//         setExercises(data);
//         setError(null);
//       } catch (error) {
//         setError('Erreur lors du chargement des exercices.');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExercises();
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
//       <Text style={styles.mobileWarning}>* Sur mobile, le codage n’est pas possible.</Text>
//       <Text style={styles.title}>Exercices</Text>
//       {exercises.length === 0 ? (
//         <Text style={styles.noExercise}>Aucun exercice trouvé.</Text>
//       ) : (
//         exercises.map((exercise) => (
//           <View key={exercise.id} style={styles.card}>
//             <Text style={styles.exerciseTitle}>{exercise.title}</Text>
//             <TouchableOpacity onPress={() => Linking.openURL(exercise.imageLink)}>
//               <Image
//                 source={{ uri: exercise.imageLink }}
//                 style={styles.exerciseImage}
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//             <Text style={styles.exerciseContent}>{exercise.content}</Text>
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
//   mobileWarning: {
//     fontSize: 12,
//     fontStyle: 'italic',
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     alignSelf: 'center',
//   },
//   noExercise: {
//     fontStyle: 'italic',
//     color: 'gray',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   exerciseTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   exerciseImage: {
//     width: '100%',
//     height: 180,
//     borderRadius: 8,
//     marginBottom: 12,
//     backgroundColor: '#ddd',
//   },
//   exerciseContent: {
//     fontSize: 16,
//     color: '#555',
//   },
// });
