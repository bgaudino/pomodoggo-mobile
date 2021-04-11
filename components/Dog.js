import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';

export const Dog = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.message}</Text>
            <Image style={styles.dog} source={{uri: props.source}}/>
            <Text style={styles.text}>{props.breed}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
    dog: {
      height: 300,
      width: 300,
      borderRadius: 20,
      borderWidth: 4,
      borderColor:  'white',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Marker Felt',
        fontSize: 20
      }
})