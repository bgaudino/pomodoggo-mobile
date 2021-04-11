import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const BreakButtons = props => {
    return (
        <View style={styles.buttonGroup}>
          <Text style={styles.text}>Break length - {props.break} min</Text>
          <View style={[styles.buttonGroup, {justifySelf: 'flex-end'}]}>
            <TouchableOpacity style={styles.button} onPress={props.dec}>
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.inc}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    button: {
        backgroundColor: '#281510',
        width: 40,
        height: 40,
        borderRadius: 12,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Marker Felt',
        fontSize: 20
    }
})
