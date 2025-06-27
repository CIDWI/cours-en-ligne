// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { router } from 'expo-router';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { AuthContext } from '../../src/contexts/AuthContext';

// // export default function Accueil() {
// //   const [menuVisible, setMenuVisible] = useState(false);

// //   const toggleMenu = () => {
// //     setMenuVisible(!menuVisible);
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       // Supprimer la donnée de connexion, exemple le token
// //       await AsyncStorage.removeItem('userToken');
// //       // Tu peux aussi vider tout si besoin :
// //       // await AsyncStorage.clear();

// //       // Puis rediriger vers la page connexion
// //       router.replace('/connexion'); // remplace la route actuelle (pas retour possible)
// //     } catch (error) {
// //       console.error('Erreur lors de la déconnexion', error);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Image source={require('../../assets/images/cid.png')} style={styles.logo} />

// //       <Text style={styles.title}>
// //         Bienvenue chez <Text style={styles.brand}>CIDWI</Text>
// //       </Text>

// //       <TouchableOpacity style={styles.profilButton} onPress={() => router.push('/profilScreen')}>
// //         <Text style={styles.profilButtonText}>Voir mon Profil</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
// //         <Ionicons name="menu" size={32} color="black" />
// //       </TouchableOpacity>

// //       {menuVisible && (
// //         <View style={styles.menu}>
// //           <TouchableOpacity
// //             style={styles.menuItem}
// //             onPress={() => {
// //               setMenuVisible(false);
// //               router.push('/profilScreen');
// //             }}
// //           >
// //             <Text style={styles.menuText}>Profil</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={styles.menuItem}
// //             onPress={() => {
// //               setMenuVisible(false);
// //               handleLogout();  // <-- Ici on appelle la vraie déconnexion
// //             }}
// //           >
// //             <Text style={styles.menuText}>Se déconnecter</Text>
// //           </TouchableOpacity>
// //         </View>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#fff',
// //   },
// //   logo: {
// //     width: 120,
// //     height: 120,
// //     marginBottom: 20,
// //     resizeMode: 'contain',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 30,
// //     textAlign: 'center',
// //   },
// //   brand: {
// //     color: '#007AFF',
// //   },
// //   profilButton: {
// //     backgroundColor: '#007AFF',
// //     paddingVertical: 12,
// //     paddingHorizontal: 24,
// //     borderRadius: 8,
// //     marginBottom: 20,
// //   },
// //   profilButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   hamburger: {
// //     position: 'absolute',
// //     top: 40,
// //     right: 20,
// //     zIndex: 2,
// //   },
// //   menu: {
// //     position: 'absolute',
// //     top: 80,
// //     right: 20,
// //     backgroundColor: '#fff',
// //     borderRadius: 8,
// //     elevation: 5,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     padding: 10,
// //     zIndex: 3,
// //   },
// //   menuItem: {
// //     paddingVertical: 12,
// //     paddingHorizontal: 20,
// //   },
// //   menuText: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// // });


// import React, { useState, useContext } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// // import { AuthContext } from '../../src/contexts/AuthContext';

// export default function Accueil() {
//   const [menuVisible, setMenuVisible] = useState(false);
// //   const { logout } = useContext(AuthContext);

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   const handleLogout = async () => {
//     try {
//     //   await logout(); // Appelle la fonction logout du contexte
//       router.replace('/connexion'); // Redirige vers la page de connexion sans possibilité de retour
//     } catch (error) {
//       console.error('Erreur lors de la déconnexion', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../../assets/images/cid.png')} style={styles.logo} />

//       <Text style={styles.title}>
//         Bienvenue chez <Text style={styles.brand}>CIDWI</Text>
//       </Text>

//       <TouchableOpacity
//         style={styles.profilButton}
//         onPress={() => router.push('/profilScreen')}
//       >
//         <Text style={styles.profilButtonText}>Voir mon Profil</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
//         <Ionicons name="menu" size={32} color="black" />
//       </TouchableOpacity>

//       {menuVisible && (
//         <View style={styles.menu}>
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => {
//               setMenuVisible(false);
//               router.push('/profilScreen');
//             }}
//           >
//             <Text style={styles.menuText}>Profil</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => {
//               setMenuVisible(false);
//               handleLogout();
//             }}
//           >
//             <Text style={styles.menuText}>Se déconnecter</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   logo: {
//     width: 120,
//     height: 120,
//     marginBottom: 20,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   brand: {
//     color: '#007AFF',
//   },
//   profilButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   profilButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   hamburger: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 2,
//   },
//   menu: {
//     position: 'absolute',
//     top: 80,
//     right: 20,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     padding: 10,
//     zIndex: 3,
//   },
//   menuItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Accueil() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = async () => {
    try {
      // Ici, tu peux appeler ta logique logout si tu as un contexte
      router.replace('/connexion'); // Redirige vers la page de connexion sans possibilité de retour
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/cid.png')} style={styles.logo} />

      <Text style={styles.title}>
        Bienvenue chez <Text style={styles.brand}>CIDWI</Text>
      </Text>

      <TouchableOpacity
        style={styles.profilButton}
        onPress={() => router.push('/profilScreen')}
      >
        <Text style={styles.profilButtonText}>Voir mon Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.hamburger} onPress={toggleMenu}>
        <Ionicons name="menu" size={32} color="black" />
      </TouchableOpacity>

      {menuVisible && (
  <View style={styles.menu}>
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setMenuVisible(false);
        router.push('/accueil'); // Accueil
      }}
    >
      <Text style={styles.menuText}>Accueil</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setMenuVisible(false);
        router.push('/ChapitreScreen'); // Liste des cours
      }}
    >
      <Text style={styles.menuText}>Cours</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setMenuVisible(false);
        router.push('/AdvancementScreen'); // Progrès
      }}
    >
      <Text style={styles.menuText}>Progrès</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setMenuVisible(false);
        router.push('/profilScreen'); // Profil
      }}
    >
      <Text style={styles.menuText}>Profil</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setMenuVisible(false);
        handleLogout();
      }}
    >
      <Text style={styles.menuText}>Déconnexion</Text>
       </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        setMenuVisible(false);
        router.push('/deconnexion'); // Profil
      }}
      >
    </TouchableOpacity>
  </View>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  brand: {
    color: '#007AFF',
  },
  profilButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  profilButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hamburger: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
  },
  menu: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
    zIndex: 3,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
