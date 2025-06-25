// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome! AAAAAH</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
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
        //  router.replace(`/ChapitreScreen`);
          router.replace(`/accueil`);
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
