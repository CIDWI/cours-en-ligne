// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }



// // app/_layout.tsx
// import React from 'react';
// import { Slot } from 'expo-router';
// import { AuthProvider } from '../src/contexts/AuthContext';
// import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });
//   if (!loaded) return null;

//   return (
//     <AuthProvider>
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         {/* ← c’est CE SLOT qui monte TOUTES vos pages (connexion, chapitre, tabs…) */}
//         <Slot />
//         <StatusBar style="auto" />
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }





// import React from 'react';
// import { Slot } from 'expo-router';
// import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';
// import { AuthProvider } from '../src/contexts/AuthContext';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <AuthProvider>
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         <Slot />
//         <StatusBar style="auto" />
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

import React from 'react';
import { Slot } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '../src/context/AuthContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Slot />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
