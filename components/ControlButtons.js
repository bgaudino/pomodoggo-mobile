import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const ControlButtons = props => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity style={[styles.button, {backgroundColor: props.btnColor}]} onPress={props.toggleStart}>
          <Text style={styles.text}>{props.btnText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#259aff'}]} onPress={props.getDog}>
          <Text style={styles.text}>Fetch 🦴</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#281510'}]} onPress={props.reset}>
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    button: {
      width: 120, 
      borderWidth: 1, 
      borderColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Marker Felt',
        fontSize: 20
    }
})
