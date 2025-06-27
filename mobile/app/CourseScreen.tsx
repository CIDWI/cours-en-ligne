// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

// export default function CourseScreen() {
//   const { lessonTitle, level, languages, link } = useLocalSearchParams();
//   const router = useRouter();

//   const getYoutubeVideoId = (url: string): string | null => {
//     const match = url?.match(
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)/
//     );
//     return match ? match[1] : null;
//   };

//   const videoId = typeof link === 'string' ? getYoutubeVideoId(link) : null;
//   const thumbnailUrl = videoId
//     ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//     : null;

//   const openYoutube = () => {
//     if (typeof link === 'string') {
//       Linking.openURL(link);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{lessonTitle}</Text>
//       <Text style={styles.detail}>Niveau : {level}</Text>
//       <Text style={styles.detail}>Langage : {languages}</Text>

//       {videoId && typeof thumbnailUrl === 'string' ? (
//         <TouchableOpacity onPress={openYoutube} style={styles.videoContainer}>
//           <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
//           <Text style={styles.playButton}>▶️ Regarder la vidéo</Text>
//         </TouchableOpacity>
//       ) : (
//         <Text style={styles.errorText}>Lien vidéo non valide.</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   detail: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   videoContainer: {
//     marginTop: 16,
//     alignItems: 'center',
//   },
//   thumbnail: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//   },
//   playButton: {
//     marginTop: 8,
//     fontSize: 16,
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   errorText: {
//     marginTop: 16,
//     color: 'red',
//   },
// });

import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CourseScreen() {
  // Déclare tous les params ici
  const { lessonTitle, level, languages, link, chapterId, chapterTitle } = useLocalSearchParams();
  const router = useRouter();

  const getYoutubeVideoId = (url: string): string | null => {
    const match = url?.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = typeof link === 'string' ? getYoutubeVideoId(link) : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const openYoutube = () => {
    if (typeof link === 'string') {
      Linking.openURL(link);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.replace({
            pathname: '/LessonScreen',
            params: { chapterId, chapterTitle },
          })
        }
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="#6c5ce7" />
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{lessonTitle}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <Text style={styles.label}>Niveau :</Text> {level}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Langage :</Text> {languages}
        </Text>
      </View>

      {videoId && thumbnailUrl ? (
        <TouchableOpacity onPress={openYoutube} style={styles.videoContainer} activeOpacity={0.8}>
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
          <View style={styles.playOverlay}>
            <Ionicons name="play-circle" size={64} color="rgba(255,255,255,0.8)" />
          </View>
          <Text style={styles.playButton}>Regarder la vidéo</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.errorText}>Lien vidéo non valide.</Text>
      )}

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
    backgroundColor: '#f9fafe',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40, // descendre un peu le bouton
  },
  backText: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  label: {
    fontWeight: '700',
    color: '#636e72',
  },
  detail: {
    fontSize: 18,
    color: '#636e72',
    marginBottom: 8,
  },
  videoContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    top: '40%',
    left: '42%',
  },
  playButton: {
    marginTop: 12,
    fontSize: 18,
    color: '#0984e3',
    fontWeight: '700',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 30,
    fontSize: 16,
    color: '#d63031',
    textAlign: 'center',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  homeText: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
