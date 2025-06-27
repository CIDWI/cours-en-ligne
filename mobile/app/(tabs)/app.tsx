// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Accueil from './accueil';
// import Profil from './profil';
  
// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Accueil">
//         <Stack.Screen name="Accueil" component={Accueil} />
//         <Stack.Screen name="Profil" component={Profil} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React, { useContext, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Accueil from './accueil';
// import Profil from './profil';
// import Connexion from './connexion'; // page connexion à créer
// import { AuthProvider, AuthContext } from '../../src/contexts/AuthContext';

// const Stack = createNativeStackNavigator();

// function RootNavigator() {
//   const { userToken, loading } = useContext(AuthContext);

//   if (loading) {
//     // Affiche un loader pendant le chargement du token
//     return null;
//   }

//   return (
//     <Stack.Navigator>
//       {userToken == null ? (
//         // Pas connecté => page de connexion uniquement
//         <Stack.Screen
//           name="Connexion"
//           component={Connexion}
//           options={{ headerShown: false }}
//         />
//       ) : (
//         // Connecté => pages principales
//         <>
//           <Stack.Screen name="Accueil" component={Accueil} />
//           <Stack.Screen name="Profil" component={Profil} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// // }
// import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Accueil from './accueil';
// import Profil from './profil';
// import Connexion from './connexion';
// import { AuthProvider, AuthContext } from '../../src/contexts/AuthContext';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const Stack = createNativeStackNavigator();
// const queryClient = new QueryClient();

// function RootNavigator() {
//   const { userToken, loading } = useContext(AuthContext);

//   if (loading) {
//     // Affiche un loader pendant le chargement du token
//     return null;
//   }

//   return (
//     <Stack.Navigator>
//       {userToken == null ? (
//         <Stack.Screen
//           name="Connexion"
//           component={Connexion}
//           options={{ headerShown: false }}
//         />
//       ) : (
//         <>
//           <Stack.Screen name="Accueil" component={Accueil} />
//           <Stack.Screen name="Profil" component={Profil} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <NavigationContainer>
//           <RootNavigator />
//         </NavigationContainer>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';

import Accueil from './accueil';
import Connexion from './connexion';
import ProfilScreen from './profilScreen';

import { AuthContext, AuthProvider } from '../../src/context/AuthContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function RootNavigator() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    // Affiche un loader ou écran vide pendant le chargement du token
    return null;
  }

  return (
    <Stack.Navigator>
      {userToken == null ? (
        // Si pas connecté, on montre la page Connexion
        <Stack.Screen
          name="Connexion"
          component={Connexion}
          options={{ headerShown: false }}
        />
      ) : (
        // Si connecté, on montre les écrans principaux
        <>
          <Stack.Screen name="Accueil" component={Accueil} />
          <Stack.Screen name="Profil" component={ProfilScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}


















































// // RootNavigator.tsx
// import React, { useContext } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Text } from 'react-native';
// import Accueil from './accueil';
// import Profil from './profil';
// import Connexion from './connexion';
// import { AuthContext } from './AuthContext';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   const { userToken, loading } = useContext(AuthContext);

//   if (loading) {
//     return <Text>Chargement...</Text>;
//   }

//   return (
//     <Stack.Navigator>
//       {userToken == null ? (
//         <Stack.Screen
//           name="Connexion"
//           component={Connexion}
//           options={{ headerShown: false }}
//         />
//       ) : (
//         <>
//           <Stack.Screen name="Accueil" component={Accueil} />
//           <Stack.Screen name="Profil" component={Profil} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }
