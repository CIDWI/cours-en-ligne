// // import React, { useState } from 'react';
// // import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';

// // export default function Connexion() {

// //   const [email, setEmail] = useState('');
// //   const [motDePasse, setMotDePasse] = useState('');

// //   let [fontsLoaded] = useFonts({
// //     Quicksand_400Regular,
// //   });

// //   if (!fontsLoaded) {
// //     return null;
// //   }

// //   // Définis handleConnexion ici, avant le return
// //   const handleConnexion = () => {
// //     console.log('Connexion demandée avec', email, motDePasse);
// //     // Tu peux mettre ici ta logique de validation ou appel API
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Connexion</Text>

// //       <Text style={[styles.label, styles.quicksand, { color: 'red' }]}>Email</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Entrez votre email"
// //         placeholderTextColor="grey"
// //         value={email}
// //         onChangeText={setEmail}
// //         keyboardType="email-address"
// //         autoCapitalize="none"
// //       />

// //       <Text style={[styles.label, styles.quicksand, { color: 'green' }]}>Mot de passe</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Entrez votre mot de passe"
// //         placeholderTextColor="grey"
// //         value={motDePasse}
// //         onChangeText={setMotDePasse}
// //         secureTextEntry
// //       />

// //       <TouchableOpacity style={styles.button} onPress={handleConnexion}>
// //         <Text style={[styles.buttonText, styles.quicksand]}>Se connecter</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 24,
// //     justifyContent: 'center',
// //     backgroundColor: '#fff',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     alignSelf: 'center',
// //     marginBottom: 24,
// //   },
// //   label: {
// //     fontSize: 16,
// //     marginBottom: 6,
// //     marginTop: 12,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 12,
// //     borderRadius: 8,
// //   },
// //   button: {
// //     backgroundColor: '#007bff',
// //     padding: 14,
// //     borderRadius: 8,
// //     marginTop: 24,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //   },
// //   quicksand: {
// //     fontFamily: 'Quicksand_400Regular',
// //     fontSize: 16,
// //   },
// // });

// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
// } from 'react-native';
// import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
// import { useRouter } from 'expo-router';

// export default function Connexion() {
//   const [login, setLogin] = useState('');
//   const [motDePasse, setMotDePasse] = useState('');
//   const [erreur, setErreur] = useState('');

//   const router = useRouter();

//   let [fontsLoaded] = useFonts({
//     Quicksand_400Regular,
//   });

//   if (!fontsLoaded) return null;

//   const handleConnexion = async () => {
//     setErreur('');

//     try {
//       const response = await fetch('http://localhost:3000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           login: login, // ✅ correspond au backend
//           password: motDePasse,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Connexion réussie, token :', data.token);

//         Alert.alert('Succès', 'Connexion réussie');
//         router.push('/profilScreen');
//       } else {
//         const errorData = await response.json();
//         setErreur(errorData.message || 'Erreur de connexion');
//       }
//     } catch (error) {
//       console.error('Erreur réseau :', error);
//       setErreur('Erreur réseau. Vérifie ta connexion ou ton URL.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Connexion</Text>

//       <Text style={[styles.label, styles.quicksand, { color: 'red' }]}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Entrez votre login"
//         placeholderTextColor="grey"
//         value={login}
//         onChangeText={setLogin}
//         autoCapitalize="none"
//       />

//       <Text style={[styles.label, styles.quicksand, { color: 'green' }]}>Mot de passe</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Entrez votre mot de passe"
//         placeholderTextColor="grey"
//         value={motDePasse}
//         onChangeText={setMotDePasse}
//         secureTextEntry
//       />

//       {erreur !== '' && <Text style={styles.erreur}>{erreur}</Text>}

//       <TouchableOpacity style={styles.button} onPress={handleConnexion}>
//         <Text style={[styles.buttonText, styles.quicksand]}>Se connecter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 6,
//     marginTop: 12,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 14,
//     borderRadius: 8,
//     marginTop: 24,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   quicksand: {
//     fontFamily: 'Quicksand_400Regular',
//     fontSize: 16,
//   },
//   erreur: {
//     marginTop: 12,
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });
























































// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
// import { useRouter } from 'expo-router';

// export default function Connexion() {
//   const [login, setLogin] = useState('');
//   const [motDePasse, setMotDePasse] = useState('');
//   const [erreur, setErreur] = useState('');

//   const router = useRouter();

//   let [fontsLoaded] = useFonts({
//     Quicksand_400Regular,
//   });

//   if (!fontsLoaded) return null;

//   const handleConnexion = async () => {
//     setErreur('');

//     try {
//       // const response = await fetch('http://localhost:3000/auth/login', {
//       const response = await fetch('http://192.168.1.85:3000/auth/login', { 

//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           login: login,
//           password: motDePasse,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         // Stocker le token
//         await AsyncStorage.setItem('userToken', data.token);

//         Alert.alert('Succès', 'Connexion réussie');
//         router.push('/profilScreen'); // Redirection
//       } else {
//         const errorData = await response.json();
//         setErreur(errorData.message || 'Identifiants incorrects');
//       }
//     } catch (error) {
//       console.error('Erreur réseau :', error);
//       setErreur('Erreur réseau. Vérifie ta connexion ou ton URL.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Connexion</Text>

//       <Text style={[styles.label, styles.quicksand, { color: 'red' }]}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Entrez votre login"
//         placeholderTextColor="grey"
//         value={login}
//         onChangeText={setLogin}
//         autoCapitalize="none"
//       />

//       <Text style={[styles.label, styles.quicksand, { color: 'green' }]}>Mot de passe</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Entrez votre mot de passe"
//         placeholderTextColor="grey"
//         value={motDePasse}
//         onChangeText={setMotDePasse}
//         secureTextEntry
//       />

//       {erreur !== '' && <Text style={styles.erreur}>{erreur}</Text>}

//       <TouchableOpacity style={styles.button} onPress={handleConnexion}>
//         <Text style={[styles.buttonText, styles.quicksand]}>Se connecter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 6,
//     marginTop: 12,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 14,
//     borderRadius: 8,
//     marginTop: 24,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   quicksand: {
//     fontFamily: 'Quicksand_400Regular',
//     fontSize: 16,
//   },
//   erreur: {
//     marginTop: 12,
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });

// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
// import { useRouter } from 'expo-router';

// export default function Connexion() {
//   const [login, setLogin] = useState('');
//   const [motDePasse, setMotDePasse] = useState('');
//   const [erreur, setErreur] = useState('');

//   const router = useRouter();

//   let [fontsLoaded] = useFonts({
//     Quicksand_400Regular,
//   });

//   if (!fontsLoaded) return null;

//   const handleConnexion = async () => {
//     setErreur('');

//     try {
//       const response = await fetch('http://192.168.1.85:3000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           login: login,
//           password: motDePasse,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();

//         await AsyncStorage.setItem('userToken', data.token);

//         Alert.alert('Succès', 'Connexion réussie');

//         // Redirection vers ChapitreScreen avec un paramètre pour forcer le refresh
//         router.replace({
//           pathname: '/ChapitreScreen',
//           params: { refresh: Date.now().toString() },
//         });
//       } else {
//         const errorData = await response.json();
//         setErreur(errorData.message || 'Identifiants incorrects');
//       }
//     } catch (error) {
//       console.error('Erreur réseau :', error);
//       setErreur('Erreur réseau. Vérifie ta connexion ou ton URL.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Connexion</Text>

//       <Text style={[styles.label, styles.quicksand, { color: 'red' }]}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Entrez votre login"
//         placeholderTextColor="grey"
//         value={login}
//         onChangeText={setLogin}
//         autoCapitalize="none"
//       />

//       <Text style={[styles.label, styles.quicksand, { color: 'green' }]}>Mot de passe</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Entrez votre mot de passe"
//         placeholderTextColor="grey"
//         value={motDePasse}
//         onChangeText={setMotDePasse}
//         secureTextEntry
//       />

//       {erreur !== '' && <Text style={styles.erreur}>{erreur}</Text>}

//       <TouchableOpacity style={styles.button} onPress={handleConnexion}>
//         <Text style={[styles.buttonText, styles.quicksand]}>Se connecter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 6,
//     marginTop: 12,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 14,
//     borderRadius: 8,
//     marginTop: 24,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   quicksand: {
//     fontFamily: 'Quicksand_400Regular',
//     fontSize: 16,
//   },
//   erreur: {
//     marginTop: 12,
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
// import { useRouter } from 'expo-router';

// export default function Connexion() {
//   const [login, setLogin] = useState('');
//   const [motDePasse, setMotDePasse] = useState('');
//   const [erreur, setErreur] = useState('');

//   const router = useRouter();

//   let [fontsLoaded] = useFonts({
//     Quicksand_400Regular,
//   });

//   if (!fontsLoaded) return null;

//   const handleConnexion = async () => {
//     setErreur('');

//     try {
//       // const response = await fetch('http://192.168.1.85:3000/auth/login', {
//         const response = await fetch('http://192.168.1.17:3000/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ login, password: motDePasse }),
//       });

//       if (response.ok) {
//         const { token } = await response.json();
//         await AsyncStorage.setItem('userToken', token);
//         Alert.alert('Succès', 'Connexion réussie');

//         // Redirection vers ChapitreScreen avec un paramètre pour forcer le refresh
//          router.replace(`/ChapitreScreen`);
//       } else {
//         const { message } = await response.json();
//         setErreur(message || 'Identifiants incorrects');
//       }
//     } catch (error) {
//       console.error('Erreur réseau :', error);
//       setErreur('Erreur réseau. Vérifie ta connexion ou ton URL.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Connexion</Text>

//       <Text style={[styles.label, styles.quicksand, { color: 'red' }]}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Entrez votre login"
//         placeholderTextColor="grey"
//         value={login}
//         onChangeText={setLogin}
//         autoCapitalize="none"
//       />

//       <Text style={[styles.label, styles.quicksand, { color: 'green' }]}>Mot de passe</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Entrez votre mot de passe"
//         placeholderTextColor="grey"
//         value={motDePasse}
//         onChangeText={setMotDePasse}
//         secureTextEntry
//       />

//       {erreur !== '' && <Text style={styles.erreur}>{erreur}</Text>}

//       <TouchableOpacity style={styles.button} onPress={handleConnexion}>
//         <Text style={[styles.buttonText, styles.quicksand]}>Se connecter</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginBottom: 24,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 6,
//     marginTop: 12,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 14,
//     borderRadius: 8,
//     marginTop: 24,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   quicksand: {
//     fontFamily: 'Quicksand_400Regular',
//     fontSize: 16,
//   },
//   erreur: {
//     marginTop: 12,
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { useRouter } from 'expo-router';

export default function Connexion() {
  const [login, setLogin] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');

  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
  });

  if (!fontsLoaded) return null;

  const handleConnexion = async () => {
    setErreur('');

    try {
      const response = await fetch('http://192.168.1.85:3000/auth/login', {
        // const response = await fetch('http://192.168.1.17:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password: motDePasse }),
      });

      if (response.ok) {
        const { token } = await response.json();
        await AsyncStorage.setItem('userToken', token);
        Alert.alert('Succès', 'Connexion réussie');

        // Redirection vers ChapitreScreen avec un paramètre pour forcer le refresh
         router.replace(`/ChapitreScreen`);
      } else {
        const { message } = await response.json();
        setErreur(message || 'Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      setErreur('Erreur réseau. Vérifie ta connexion ou ton URL.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion ✨</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Login"
          placeholderTextColor="#888"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#888"
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />

        {erreur !== '' && <Text style={styles.erreur}>{erreur}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleConnexion}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 36,
    color: '#5e3dea',
    fontFamily: 'Quicksand_400Regular',
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 20,
    shadowColor: '#5e3dea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#d6ccfa',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#7b4fe0',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Quicksand_400Regular',
  },
  erreur: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Quicksand_400Regular',
  },
});





















































































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
// import { useRouter, useRootNavigationState } from 'expo-router';
// import { AuthContext } from '../../src/contexts/AuthContext';

// export default function ChapitreScreen() {
//   const [chapters, setChapters] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { userToken } = useContext(AuthContext);
//   const router = useRouter();
//   const navigationState = useRootNavigationState(); // 👈 pour attendre que le layout soit prêt

//   useEffect(() => {
//     if (!navigationState?.key) return; // ⛔️ tant que le layout n’est pas prêt

//     if (!userToken) {
//       router.replace('/connexion'); // 🔐 redirection sécurisée
//       return;
//     }

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
//   }, [userToken, navigationState?.key]);

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
