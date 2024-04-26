import Reac from "react"
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#98FB98',
        alignItems: 'flex-end',
    },
    displayValue: {
        fontSize: 100,
        color: '#D2691E',

    }
})

export default props =>
    <View style={styles.display}>
        <Text style={styles.displayValue}
            number0flines={1}>{props.value}</Text>
    </View>