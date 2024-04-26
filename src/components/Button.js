// Button.js
import React from 'react';
import { Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#40E0D0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#4682B4',
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3,
    }
});

const Button = props => {
    const handlePress = () => {
        props.onClick(props.label);
    };

    const stylesButton = [styles.button];
    if (props.double) stylesButton.push(styles.buttonDouble);
    if (props.triple) stylesButton.push(styles.buttonTriple);
    if (props.operation) stylesButton.push(styles.operationButton);

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableWithoutFeedback>
    );
};

export default Button;
