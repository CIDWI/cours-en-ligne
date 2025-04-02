import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, TextInput, View } from 'react-native';

export default function Form() {

    const [pressButton, setPressButton] = useState("");
    
      const handlePress = () => {
        console.log(pressButton)
      }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.text}
                placeholder='Ecrire ici'
                value={pressButton}
                onChangeText={setPressButton}
            />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Press Me</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eeeeee',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10
    },
    text: {
      fontSize: 20,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 20,
      width: "50%",
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    button: {
      backgroundColor:"red",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 20,
      width: "30%",
    },
    buttonText: {
      fontSize: 15,
      color: "white",
      fontWeight: 700,
      textAlign: "center"
    }
});
  